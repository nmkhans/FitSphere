import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { collection: trainerapplicationsCollection } = await dbConnect(collectionNameObj.trainerApplicationsCollection);
        
        // Get user's application status
        const application = await trainerapplicationsCollection.findOne({
            userId: session.user.id,
        }, {
            sort: { appliedAt: -1 } // Get the most recent application
        });

        return NextResponse.json({ 
            hasApplication: !!application,
            applicationStatus: application?.status || null,
            application: application ? {
                _id: application._id,
                status: application.status,
                appliedAt: application.appliedAt,
                reviewedAt: application.reviewedAt,
                adminNotes: application.adminNotes
            } : null
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching application status:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
