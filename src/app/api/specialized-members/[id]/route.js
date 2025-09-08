import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET - Fetch a specific specialized member
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid member ID" },
        { status: 400 }
      );
    }

    const specializedMembersCollection = await dbConnect(collectionNameObj.specializedMembersCollection);
    const member = await specializedMembersCollection.findOne({ _id: new ObjectId(id) });
    
    if (!member) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: member
    });
  } catch (error) {
    console.error("Error fetching specialized member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch specialized member" },
      { status: 500 }
    );
  }
}

// PUT - Update a specialized member
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid member ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      age,
      category,
      healthDetails,
      emergencyContact,
      medicalClearance,
      specialNotes,
      status,
      trainerAssigned
    } = body;

    const specializedMembersCollection = await dbConnect(collectionNameObj.specializedMembersCollection);
    
    // Check if member exists
    const existingMember = await specializedMembersCollection.findOne({ _id: new ObjectId(id) });
    if (!existingMember) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }

    // Prepare update object
    const updateData = {
      updatedAt: new Date()
    };

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (age !== undefined) updateData.age = age;
    if (category !== undefined) updateData.category = category;
    if (healthDetails !== undefined) updateData.healthDetails = healthDetails;
    if (emergencyContact !== undefined) updateData.emergencyContact = emergencyContact;
    if (medicalClearance !== undefined) updateData.medicalClearance = medicalClearance;
    if (specialNotes !== undefined) updateData.specialNotes = specialNotes;
    if (status !== undefined) updateData.status = status;
    if (trainerAssigned !== undefined) updateData.trainerAssigned = trainerAssigned;

    const result = await specializedMembersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: "No changes made to member" },
        { status: 400 }
      );
    }

    const updatedMember = await specializedMembersCollection.findOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({
      success: true,
      data: updatedMember,
      message: "Member updated successfully"
    });
  } catch (error) {
    console.error("Error updating specialized member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update specialized member" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a specialized member
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid member ID" },
        { status: 400 }
      );
    }

    const specializedMembersCollection = await dbConnect(collectionNameObj.specializedMembersCollection);
    
    const result = await specializedMembersCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Member not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Member deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting specialized member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete specialized member" },
      { status: 500 }
    );
  }
}
