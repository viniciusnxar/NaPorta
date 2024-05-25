import {AppProvider} from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Roboto } from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast";

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata = {
  title: 'NaPorta',
  description: 'O seu aplicativo de entrega de comida',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={roboto.className}>
          <AppProvider>
          <Header />
          <main className="max-w-4xl mx-auto p-4">
            <Toaster />
            {children}
            <footer className="border-t p-8 text-center text-gray-500 mt-16">
              &copy; 2024 Baidu LTDA
            </footer>
            </main>
          </AppProvider>
      </body>
    </html>
  )
}
