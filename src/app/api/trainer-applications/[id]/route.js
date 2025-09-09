import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Only admins can approve/reject applications
        if (session.user.role !== "admin") {
            return NextResponse.json({ error: "Forbidden - Admin access required" }, { status: 403 });
        }

        const { id } = params;
        const data = await req.json();
        const { status, adminNotes } = data;

        if (!["approved", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Invalid status. Must be 'approved' or 'rejected'" }, { status: 400 });
        }

        // Get database connections
        const { collection: trainerapplicationsCollection } = await dbConnect(collectionNameObj.trainerApplicationsCollection);
        const { collection: usersCollection } = await dbConnect(collectionNameObj.usersCollection);

        // Find the application
        const application = await trainerapplicationsCollection.findOne({
            _id: new ObjectId(id)
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        if (application.status !== "pending") {
            return NextResponse.json({ error: "Application has already been reviewed" }, { status: 400 });
        }

        // Update the application status
        const updateResult = await trainerapplicationsCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status: status,
                    reviewedAt: new Date(),
                    reviewedBy: session.user.id,
                    adminNotes: adminNotes || ''
                }
            }
        );

        if (updateResult.matchedCount === 0) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        // If approved, update user role to trainer
        if (status === "approved") {
            const userUpdateResult = await usersCollection.updateOne(
                { _id: new ObjectId(application.userId) },
                {
                    $set: {
                        role: "trainer",
                        trainerProfile: {
                            specialization: application.specialization,
                            experience: application.experience,
                            certifications: application.certifications,
                            availability: application.availability,
                            approved: true,
                            approvedAt: new Date(),
                            approvedBy: session.user.id
                        },
                        updatedAt: new Date()
                    }
                }
            );

            if (userUpdateResult.matchedCount === 0) {
                console.error("Failed to update user role to trainer");
                // Note: In a production app, you might want to revert the application status here
            }
        }

        const updatedApplication = await trainerapplicationsCollection.findOne({
            _id: new ObjectId(id)
        });

        return NextResponse.json({ 
            success: true, 
            message: `Application ${status} successfully`,
            application: updatedApplication
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating trainer application:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
