import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientProvider from "./provider"
import { Header } from "@/components/layouts/Header"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://clavento.com"),
  title: "Clavento | Classic Music Community",
  description:
    "Clavento can get and share a lot of information about classical music, performers, composers, and more.",
  openGraph: {
    title: "Clavento | Classic Music Community",
    description:
      "Clavento can get and share a lot of information about classical music, performers, composers, and more.",
    url: "https://clavento.com",
    siteName: "Clavento",
    locale: "ko-KR",
    type: "website",
    images: [
      {
        url: "/clavento.png",
        width: 380,
        height: 380,
        alt: "Clavento",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen antialiased`}>
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  )
}
