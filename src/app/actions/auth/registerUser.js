"use server";

import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const registerUser = async (payload) => {
  try {
    const usersCollection = await dbConnect("users");
    const { email, password } = payload;

    if (!email || !password) {
      return { success: false, message: "Email and password required" };
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    payload.password = hashedPassword;

    const result = await usersCollection.insertOne(payload);
    const { acknowledged, insertedId } = result;

    return { success: acknowledged, insertedId: insertedId.toString() };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Internal server error" };
  }
};

export default registerUser;
