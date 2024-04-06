import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import connectDB from "@/config/db";
// import {encode, decode} from "next-auth/prov"

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        let userRole = "user";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          await connectDB();
          const foundUser = await User.findOne({
            email: credentials.email,
          }).exec();
          if (foundUser) {
            const passwordMatch = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );
            if (passwordMatch) {
              foundUser["role"] = "user";
              return {
                ...foundUser,
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
              };
            }
          }
        } catch (err) {
          console.log(err);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...user,
          id: user.id,
          role: user.role,
          image: user.picture,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        return {
          ...session,
          id: token.id,
          role: token.role,
        };
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await connectDB();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("error saving user to the db");
          return false;
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
  },
};
