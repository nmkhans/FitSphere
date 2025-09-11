import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Prevent trainers and admins from applying
        if (session.user.role === "trainer" || 
            session.user.role === "special-need-trainer" || 
            session.user.role === "admin") {
            return NextResponse.json({ error: "You are already a trainer or admin" }, { status: 400 });
        }

        // Prevent users with active memberships from applying
        if (session.user.membershipType) {
            return NextResponse.json({ error: "You cannot apply as a trainer while having an active membership" }, { status: 400 });
        }

        // Double-check membership status from database
        const { collection: usersCollection } = await dbConnect(collectionNameObj.usersCollection);
        const user = await usersCollection.findOne({ _id: new ObjectId(session.user.id) });
        
        if (user && user.membershipType) {
            return NextResponse.json({ error: "You cannot apply as a trainer while having an active membership" }, { status: 400 });
        }

        const data = await req.json();
        
        // Validate trainerType
        const trainerType = data.trainerType || 'gym'; // default to 'gym' for backward compatibility
        if (!['gym', 'special-need'].includes(trainerType)) {
            return NextResponse.json({ error: "Invalid trainer type" }, { status: 400 });
        }
        
        // Validate required fields based on trainer type
        const baseRequiredFields = [
            'name', 'email', 'phone', 'age', 'gender', 'address', 'specialization'
        ];
        
        // Add specific fields based on trainer type - keeping it simple for special-need trainers
        const requiredFields = [...baseRequiredFields];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return NextResponse.json({ error: `${field} is required` }, { status: 400 });
            }
        }

        // Check if user already has a pending application
        const { collection: trainerapplicationsCollection } = await dbConnect(collectionNameObj.trainerApplicationsCollection);
        
        const existingApplication = await trainerapplicationsCollection.findOne({
            userId: session.user.id,
            status: { $in: ["pending", "approved"] }
        });

        if (existingApplication) {
            if (existingApplication.status === "approved") {
                return NextResponse.json({ error: "You are already approved as a trainer" }, { status: 400 });
            }
            if (existingApplication.status === "pending") {
                return NextResponse.json({ error: "You already have a pending application" }, { status: 400 });
            }
        }

        // Create the trainer application
        const application = {
            userId: session.user.id,
            userEmail: session.user.email,
            trainerType: trainerType,
            name: data.name,
            email: data.email,
            phone: data.phone,
            age: parseInt(data.age),
            gender: data.gender,
            address: data.address,
            specialization: data.specialization,
            status: "pending",
            appliedAt: new Date(),
            reviewedAt: null,
            reviewedBy: null,
            adminNotes: ''
        };

        const result = await trainerapplicationsCollection.insertOne(application);

        return NextResponse.json({ 
            success: true, 
            message: "Application submitted successfully",
            applicationId: result.insertedId 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating trainer application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Only admins can fetch all applications
        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
        }

        const { collection: trainerapplicationsCollection } = await dbConnect(collectionNameObj.trainerApplicationsCollection);
        
        // Get all applications, sorted by most recent first
        const applications = await trainerapplicationsCollection
            .find({})
            .sort({ appliedAt: -1 })
            .toArray();

        return NextResponse.json({ applications }, { status: 200 });

    } catch (error) {
        console.error("Error fetching trainer applications:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
