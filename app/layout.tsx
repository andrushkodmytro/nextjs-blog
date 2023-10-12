import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from '@/app/components/Provider';
import Navbar from '@/app/components/navbar/Navbar';
import Footer from '@/app/components/footer/Footer';
import { ThemeContextProvider } from './context/ThemeContext';
import ThemeProvider from './provider/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meta blog',
  description: 'Meta blog Home page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className='container'>
                <Navbar />
                <main className='main'>
                  <div className='wrapper'>{children}</div>
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </Provider>
      </body>
    </html>
  );
}
