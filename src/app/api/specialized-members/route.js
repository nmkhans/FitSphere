import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// GET - Fetch all specialized members
export async function GET(request) {
  try {
    const {collection: specializedMembersCollection} = await dbConnect(collectionNameObj.specializedMembersCollection);
    
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    
    let query = {};
    if (category) {
      query.category = category;
    }
    
    const members = await specializedMembersCollection.find(query).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error("Error fetching specialized members:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch specialized members" },
      { status: 500 }
    );
  }
}

// POST - Create a new specialized member
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      age,
      category,
      healthDetails,
      emergencyContact,
      medicalClearance,
      specialNotes
    } = body;

    // Validate required fields
    if (!name || !email || !category) {
      return NextResponse.json(
        { success: false, error: "Name, email, and category are required" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['pregnant', 'disabled'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, error: "Invalid category. Only 'pregnant' and 'disabled' are allowed." },
        { status: 400 }
      );
    }

    const {collection: specializedMembersCollection} = await dbConnect(collectionNameObj.specializedMembersCollection);
    
    // Check if member already exists
    const existingMember = await specializedMembersCollection.findOne({ email });
    if (existingMember) {
      return NextResponse.json(
        { success: false, error: "Member with this email already exists" },
        { status: 409 }
      );
    }

    const newMember = {
      name,
      email,
      age: age || null,
      category,
      healthDetails: healthDetails || "",
      emergencyContact: emergencyContact || "",
      medicalClearance: medicalClearance || "pending",
      specialNotes: specialNotes || "",
      status: "active",
      workoutPlans: [],
      dietPlans: [],
      trainerAssigned: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await specializedMembersCollection.insertOne(newMember);
    
    return NextResponse.json({
      success: true,
      data: { ...newMember, _id: result.insertedId },
      message: "Specialized member created successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating specialized member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create specialized member" },
      { status: 500 }
    );
  }
}
