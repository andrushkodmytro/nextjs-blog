import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      // [key: string]: string;
    };
  }
}