import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { cn } from '@/lib/utils'

import './globals.css'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Link Hub',
  description: 'Manage your links',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex h-screen flex-col')}>
        <Providers>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 overflow-auto">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
