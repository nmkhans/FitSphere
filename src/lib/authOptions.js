import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "./dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const {collection: usersCollection} = await dbConnect(collectionNameObj.usersCollection);
                    const user = await usersCollection.findOne({
                        email: credentials.email,
                    });

                    if (!user) {
                        console.log("User not found:", credentials.email);
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordValid) {
                        console.log("Invalid password for user:", credentials.email);
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role || "user",
                        image: user.image || null,
                    };
                } catch (error) {
                    console.error("Database error during authentication:", error);
                    return null;
                }
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
            try {
                // Connect to DB
                const {collection: usersCollection} = await dbConnect(collectionNameObj.usersCollection);

                // Check if user already exists
                const existingUser = await usersCollection.findOne({ email: user.email });

                if (!existingUser) {
                    // Insert new user
                    await usersCollection.insertOne({
                        name: user.name,
                        email: user.email,
                        role: "user",
                        image: user.image || null,
                        provider: account.provider,
                        createdAt: new Date(),
                    });
                } else {
                    // Update existing user with latest image from provider (if available and user doesn't have a custom image)
                    if (user.image && account.provider && (account.provider === 'google' || account.provider === 'github')) {
                        // Only update if the existing user doesn't have a custom uploaded image
                        // (We assume custom images are from Cloudinary and contain 'cloudinary.com')
                        if (!existingUser.image || !existingUser.image.includes('cloudinary.com')) {
                            await usersCollection.updateOne(
                                { email: user.email },
                                { 
                                    $set: { 
                                        image: user.image,
                                        updatedAt: new Date()
                                    } 
                                }
                            );
                        }
                    }
                }

                return true; // allow login
            } catch (error) {
                console.error("Database error during sign in:", error);
                return false; // deny login
            }
        },
        async jwt({ token, user, trigger, session }) {
            // Handle session update trigger (when updateSession is called)
            if (trigger === "update" && session?.user) {
                // Update token with new session data
                token.id = session.user.id || token.id;
                token.role = session.user.role || token.role;
                token.membershipType = session.user.membershipType || token.membershipType;
                token.image = session.user.image || token.image;
                token.name = session.user.name || token.name;
                return token;
            }

            if (user) {
                token.id = user.id;
                token.role = user.role || "user";
                token.membershipType = user.membershipType || null;
                token.image = user.image || null;
            } else if (token.email) {
                // Always fetch latest user data from database to ensure updates are reflected
                try {
                    const {collection: usersCollection} = await dbConnect(collectionNameObj.usersCollection);
                    const dbUser = await usersCollection.findOne({ email: token.email });
                    if (dbUser) {
                        token.id = dbUser._id.toString();
                        token.role = dbUser.role || "user";
                        token.membershipType = dbUser.membershipType || null;
                        token.image = dbUser.image || null;
                        token.name = dbUser.name || token.name;
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    // Keep existing values if database fetch fails
                    token.role = token.role || "user";
                    token.membershipType = token.membershipType || null;
                    token.image = token.image || null;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.membershipType = token.membershipType;
                session.user.image = token.image;
                session.user.name = token.name || session.user.name;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
