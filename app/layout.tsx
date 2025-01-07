import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientProvider from "./provider"
import { Header } from "@/components/layouts/Header"
import { Toaster } from "react-hot-toast"
import Script from "next/script"
import * as gtag from "@/lib/gtag"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
}

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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <ClientProvider>
          <Header />
          {children}
          <Toaster />
        </ClientProvider>
      </body>
    </html>
  )
}
