import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { collection: usersCollection } = await dbConnect(collectionNameObj.usersCollection);
    
    // Find user by email to get latest data from database
    const user = await usersCollection.findOne(
      { email: session.user.email },
      { 
        projection: { 
          _id: 1, 
          name: 1, 
          email: 1, 
          role: 1, 
          membershipType: 1,
          createdAt: 1,
          updatedAt: 1 
        } 
      }
    );

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return Response.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      membershipType: user.membershipType || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });

  } catch (error) {
    console.error("Error fetching current user:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
