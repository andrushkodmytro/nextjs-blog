import NextAuth from 'next-auth';
import { IUser } from '@/app/models/User';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      // [key: string]: string;
    };
  }
  interface User {
    firstName: string;
    lastName: string;
    img?: string;
  }
}
