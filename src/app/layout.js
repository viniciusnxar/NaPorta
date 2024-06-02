import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from "react-hot-toast";

const fonte = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'NaPorta',
  description: 'O seu aplicativo de entrega de comida',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="O seu aplicativo de entrega de comida" />
        <link rel="icon" href="/favicon.ico" />
        <title>NaPorta</title>
      </head>
      <body className={`${fonte.className} antialiased`}>
        <AppProvider>
          <Header />
          <main className="max-w-7xl mx-auto p-4">
            <Toaster />
            {children}
          </main>
          <footer className="border-t p-8 text-center text-gray-500 mt-16">
            &copy; 2024 Baidu LTDA
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
