import { ChecarAdmin } from '@/app/api/auth/[...nextauth]/route';
import { AppProvider } from '@/components/AppContext';
import Header from '@/components/layout/Header';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { UserInfo } from '@/models/UserInfo';
import Footer from '@/components/layout/Footer';
const fonte = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'NaPorta',
  description: 'O seu aplicativo de entrega de comida',
};

export default function RootLayout({ children }) {
  return (
    <html lang='pt-BR' className='scroll-smooth'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='O seu aplicativo de entrega de comida'
        />
        <link rel='icon' href='/favicon.ico' />
        <title>NaPorta</title>
      </head>
      <body className={`${fonte.className}`}>
        <AppProvider>
          <Header ChecarAdmin={UserInfo?.admin} />
          <main className='max-w-7xl mx-auto p-4'>
            <Toaster />
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
