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

              const user1 = {
                id: '1',
                name: 'J Smith',
                email: 'jsmith@example.com',
              };
              return user1;
            }
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};
