import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, {collectionNameObj} from "./dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const usersCollection = await dbConnect(collectionNameObj.usersCollection);
                const user = await usersCollection.findOne({
                    email: credentials.email,
                });

                if (!user) return null;

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                if (!isPasswordValid) return null;

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            // Connect to DB
            const usersCollection = await dbConnect(collectionNameObj.usersCollection);

            // Check if user already exists
            const existingUser = await usersCollection.findOne({ email: user.email });

            if (!existingUser) {
                // Insert new user
                await usersCollection.insertOne({
                    name: user.name,
                    email: user.email,
                    image: user.image || null,
                    provider: account.provider,
                    createdAt: new Date(),
                });
            }

            return true; // allow login
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
