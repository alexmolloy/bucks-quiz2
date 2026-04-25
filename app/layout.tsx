import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Bucks Party Quiz 🍺",
  description: "How well do you really know the buck?",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
