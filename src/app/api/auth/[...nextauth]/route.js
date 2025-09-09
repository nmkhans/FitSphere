import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

// ✅ App Router requires GET and POST named exports
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
