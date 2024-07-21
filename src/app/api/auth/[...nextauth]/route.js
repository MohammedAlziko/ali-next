import UserModal from "@/app/dbConfig/models/user";
import { connectMongoDB } from "@/app/dbConfig/mongoDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// 1-SELECT THE PROVIDER METHOD


  //  DO A SECRET STRING BY (OPENSSL -RAND64 32)



export const authOptions = {
  providers: [

// 1-SELECT THE PROVIDER METHOD
    CredentialsProvider({
      name: "Credentials",

      credentials: {},
      async authorize(credentials, req, res) {

        await connectMongoDB();

        const user = await UserModal.findOne({email: credentials.email});
     
       
       if (user) {
        // الترتيب مهم جداً
        // compare(credentials.password, user.password);
         const match = await bcrypt.compare(credentials.password, user.password);
         if (match) {return user;} else {return null;}
       } else {
         return null;
       }
      },
    }),
  ],


  //  DO A SECRET STRING BY (OPENSSL -RAND64 32)

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


























