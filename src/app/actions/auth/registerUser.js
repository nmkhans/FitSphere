"use server";

import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const registerUser = async (payload) => {
  try {
    console.log("Attempting to register user:", payload.email);
    
    const { collection: usersCollection } = await dbConnect("users");
    const { email, password } = payload;

    if (!email || !password) {
      console.log("Missing email or password");
      return { success: false, message: "Email and password required" };
    }

    console.log("Checking for existing user...");
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return { success: false, message: "User already exists" };
    }

    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;
    payload.role = payload.role || "user"; // Set default role

    console.log("Inserting user into database...");
    const result = await usersCollection.insertOne(payload);
    const { acknowledged, insertedId } = result;

    console.log("Registration result:", { acknowledged, insertedId });
    return { success: acknowledged, insertedId: insertedId.toString() };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: error.message || "Internal server error" };
  }
};

export default registerUser;
