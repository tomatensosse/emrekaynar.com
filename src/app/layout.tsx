import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { SessionProvider } from "@/components/SessionProvider"
import ClientProvider from "@/components/ClientProvider"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'emka',
  description: 'Music, Software, and More',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ClientProvider>
            {children}
          </ClientProvider>
        </SessionProvider>
      </body>
    </html>
  )
}