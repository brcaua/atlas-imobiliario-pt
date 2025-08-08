import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Atlas Imobiliário PT - Real Estate Analytics',
  description: 'Comprehensive real estate market analytics and data for Portuguese market',
  keywords: 'real estate, property, analytics, Portugal, market data, investment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={`${inter.variable}`}>
      <body className={`font-inter antialiased bg-white text-gray-900`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
