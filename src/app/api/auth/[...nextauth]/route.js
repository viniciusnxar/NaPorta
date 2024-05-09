// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '@/libs/mongoConnect';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '@/models/User';
import { UserInfo } from '@/models/UserInfo';
import { isAdmin } from '@/libs/isAdmin';

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await mongoose.connect(process.env.MONGODB_URI);

        const email = credentials?.email;
        const password = credentials?.password;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
          const userInfo = await UserInfo.findOne({ email: user.email });
          return { ...user.toObject(), isAdmin: userInfo?.admin };  // Include isAdmin from UserInfo in user object
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.isAdmin = user.isAdmin;  // Persist isAdmin in the JWT
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.isAdmin = token.isAdmin;  // Expose isAdmin to the session
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  }
};

export default NextAuth(authOptions);










// import clientPromise from '@/libs/mongoConnect';
// import { UserInfo } from '@/models/UserInfo';
// import bcrypt from 'bcrypt';
// import * as mongoose from 'mongoose';
// import { User } from '@/models/User';
// import NextAuth, { getServerSession } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { MongoDBAdapter } from "@auth/mongodb-adapter"


// export const authOptions = {
//   secret: process.env.SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       id: 'credentials',
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "test@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const email = credentials?.email;
//         const password = credentials?.password;
//         mongoose.connect(process.env.MONGODB_URI);
//         const user = await User.findOne({ email });
//         const passwordOk = user && bcrypt.compareSync(password, user.password);

//         if (passwordOk) {
//           return user;
//         }

//         return null;
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60 // 30 days
//   }
// };


// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };























