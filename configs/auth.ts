import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/configs/dbConnect';
import UserModel, { IUser } from '@/app/models/User';
import { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await dbConnect();

          if (credentials?.username && credentials?.password) {
            const user: IUser = await UserModel.findByCredentials(
              credentials.username,
              credentials.password
            );

            const newUser = {
              id: user._id.toString(),
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              name: 'ede',
              img: user.img,
            };

            return newUser;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          img: user.img,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token._id,
          firstName: token.firstName,
          lastName: token.lastName,
          img: token.img,
        },
      };
    },
  },
};
