import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET - Fetch trainer assignments
export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const trainerId = searchParams.get('trainerId');
        const memberId = searchParams.get('memberId');

        const { collection: trainerAssignmentsCollection } = await dbConnect(collectionNameObj.trainerAssignmentsCollection);

        let filter = {};
        
        // If trainer ID is provided, get assignments for that trainer
        if (trainerId && (session.user.role === "trainer" || session.user.role === "special-need-trainer")) {
            filter.trainerId = trainerId;
        }
        // If member ID is provided, get assignments for that member
        else if (memberId && (session.user.role === "special-need" || session.user.role === "admin")) {
            filter.memberId = memberId;
        }
        // If admin, they can see all assignments
        else if (session.user.role === "admin") {
            // No filter for admin - they see everything
        } else {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const assignments = await trainerAssignmentsCollection
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({ assignments }, { status: 200 });

    } catch (error) {
        console.error("Error fetching trainer assignments:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST - Create new trainer assignment (Admin only)
export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Only admins can create assignments
        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
        }

        const data = await req.json();
        const { trainerId, memberId, assignmentNotes } = data;

        // Validate required fields
        if (!trainerId || !memberId) {
            return NextResponse.json({ error: "Trainer ID and Member ID are required" }, { status: 400 });
        }

        const { collection: usersCollection } = await dbConnect(collectionNameObj.usersCollection);
        const { collection: trainerAssignmentsCollection } = await dbConnect(collectionNameObj.trainerAssignmentsCollection);

        // Verify trainer exists and has the right type
        const trainer = await usersCollection.findOne({ 
            _id: new ObjectId(trainerId),
            $or: [
                { role: "trainer" },
                { role: "special-need-trainer" }
            ]
        });
        if (!trainer) {
            return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
        }

        // Verify member exists and is special-need
        const member = await usersCollection.findOne({ 
            _id: new ObjectId(memberId),
            role: "special-need" 
        });
        if (!member) {
            return NextResponse.json({ error: "Special need member not found" }, { status: 404 });
        }

        // Check if assignment already exists
        const existingAssignment = await trainerAssignmentsCollection.findOne({
            trainerId: trainerId,
            memberId: memberId,
            status: "active"
        });

        if (existingAssignment) {
            return NextResponse.json({ error: "Active assignment already exists between this trainer and member" }, { status: 400 });
        }

        // Create new assignment
        const assignment = {
            trainerId: trainerId,
            trainerName: trainer.name,
            trainerEmail: trainer.email,
            memberId: memberId,
            memberName: member.name,
            memberEmail: member.email,
            assignmentNotes: assignmentNotes || '',
            status: "active",
            createdAt: new Date(),
            createdBy: session.user.id,
            updatedAt: new Date()
        };

        const result = await trainerAssignmentsCollection.insertOne(assignment);

        return NextResponse.json({ 
            success: true, 
            message: "Trainer assignment created successfully",
            assignmentId: result.insertedId 
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating trainer assignment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
