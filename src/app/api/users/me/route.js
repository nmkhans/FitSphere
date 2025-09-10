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
          phone: 1,
          address: 1,
          dateOfBirth: 1,
          emergencyContact: 1,
          fitnessGoals: 1,
          image: 1,
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
      phone: user.phone || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '',
      emergencyContact: user.emergencyContact || '',
      fitnessGoals: user.fitnessGoals || '',
      image: user.image || '',
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

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, phone, address, dateOfBirth, emergencyContact, fitnessGoals, image } = body;

    // Validate required fields
    if (!name) {
      return Response.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    const { collection: usersCollection } = await dbConnect(collectionNameObj.usersCollection);
    
    // Prepare update data
    const updateData = {
      ...(name && { name }),
      ...(phone !== undefined && { phone }),
      ...(address !== undefined && { address }),
      ...(dateOfBirth !== undefined && { dateOfBirth }),
      ...(emergencyContact !== undefined && { emergencyContact }),
      ...(fitnessGoals !== undefined && { fitnessGoals }),
      ...(image !== undefined && { image }),
      updatedAt: new Date()
    };

    // Update user profile
    const result = await usersCollection.updateOne(
      { email: session.user.email },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get updated user data
    const updatedUser = await usersCollection.findOne(
      { email: session.user.email },
      { 
        projection: { 
          _id: 1, 
          name: 1, 
          email: 1, 
          role: 1, 
          membershipType: 1,
          phone: 1,
          address: 1,
          dateOfBirth: 1,
          emergencyContact: 1,
          fitnessGoals: 1,
          image: 1,
          updatedAt: 1 
        } 
      }
    );

    return Response.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role || 'user',
        membershipType: updatedUser.membershipType || null,
        phone: updatedUser.phone || '',
        address: updatedUser.address || '',
        dateOfBirth: updatedUser.dateOfBirth || '',
        emergencyContact: updatedUser.emergencyContact || '',
        fitnessGoals: updatedUser.fitnessGoals || '',
        image: updatedUser.image || '',
        updatedAt: updatedUser.updatedAt
      }
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
