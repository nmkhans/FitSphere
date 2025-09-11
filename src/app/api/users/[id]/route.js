import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbConnect from "@/lib/dbConnect";

export async function PATCH(req, { params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  try {
    const { collection: usersCollection } = await dbConnect("users");
    const body = await req.json();
    const updateDoc = {};

    // Process diet plan
    if (body.dietPlan) {
      const { calories, protein, carbs, fats } = body.dietPlan;
      updateDoc.dietPlan = {
        calories: Number(calories) || 0,
        protein: Math.round(Number(protein) || 0),
        carbs: Math.round(Number(carbs) || 0),
        fats: Math.round(Number(fats) || 0),
      };
    }

    // Process exercise plan
    if (body.exercisePlan) {
      const { day, cardio, strength, flexibility } = body.exercisePlan;
      updateDoc.exercisePlan = {
        day: day || "",
        cardio: Array.isArray(cardio) ? cardio : [],
        strength: Array.isArray(strength) ? strength : [],
        flexibility: Array.isArray(flexibility) ? flexibility : [],
      };
    }

    if (Object.keys(updateDoc).length === 0) {
      return NextResponse.json(
        { message: "No valid plan data provided" },
        { status: 400 }
      );
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateDoc }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return updated user (optional, like GET)
    // const updatedUser = await usersCollection.findOne({
    //   _id: new ObjectId(id),
    // });

    return NextResponse.json(
      { message: "Plan updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating plan:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
