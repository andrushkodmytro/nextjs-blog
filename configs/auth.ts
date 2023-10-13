import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/configs/dbConnect';
import User, { IUser } from '@/app/models/User';

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          await dbConnect();

          if (credentials?.username) {
            const user = (await User.findOne({
              email: credentials.username,
            }).lean()) as IUser;

            if (user && user.password === credentials.password) {
              const newUser = { id: 'hello', ...user };

              return newUser;
            }
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          _id: user._id.toString(),
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
