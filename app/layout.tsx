import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/providers/language-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ADN Adventures - India Travel Agency",
  description:
    "Discover the best of India with ADN Adventures. From Kanyakumari to Kashmir, explore incredible destinations.",
  generator: "v0.app",
  icons: {
    // icon: [
      // {
      //   url: "/icon-light-32x32.png",
      //   media: "(prefers-color-scheme: light)",
      // },
      // {
      //   url: "/icon-dark-32x32.png",
      //   media: "(prefers-color-scheme: dark)",
      // },
      // {
      //   url: "/icon.svg",
      //   type: "image/svg+xml",
      // },
    // ],
    icon: "/logo.webp",
    apple: "/logo.webp",
    // apple: [
    //   {
    //     url: "/apple-icon-light.png",
    //     media: "(prefers-color-scheme: light)",
    //   },
    //   {
    //     url: "/apple-icon-dark.png",
    //     media: "(prefers-color-scheme: dark)",
    //   },
    // ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <Analytics />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
