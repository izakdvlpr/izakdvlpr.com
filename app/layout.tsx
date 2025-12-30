import '@/styles/global.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Script from 'next/script'
import type { ReactNode } from 'react'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/providers/theme-provider'
import { PUBLIC_URL, cn } from '@/utils'

const geistSans = localFont({
  variable: '--font-geist-sans',
  src: [
    {
      path: '../public/fonts/geist-sans-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-sans-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-sans-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-sans-semi-bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-sans-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const geistMono = localFont({
  variable: '--font-geist-mono',
  src: [
    {
      path: '../public/fonts/geist-mono-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-mono-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-mono-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-mono-semi-bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/geist-mono-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

const title = 'Isaque Lima'
const description = 'Full Stack Developer'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: PUBLIC_URL,
  },
  openGraph: {
    title,
    type: 'website',
    locale: 'pt_BR',
    url: PUBLIC_URL,
    description,
    images: [
      {
        url: `${PUBLIC_URL}/api/og?title=${encodeURIComponent('Isaque Lima')}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    creator: '@izakdvlpr',
    site: '@izakdvlpr',
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://dataxamas.izakdvlpr.com/dataxamas.js"
          data-website-id="d6423482-efa1-4b0b-8f0f-ecf1ad509cf6"
        />
        
        <Script
          defer
          data-cf-beacon='{"token": "1164f2eeb6034fcebd9aac5997ce8ba4"}'
          src="https://static.cloudflareinsights.com/beacon.min.js"
        />
        
        <Script
          id="ga-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9X4XZM7GBG');
            `,
          }}
        />
        
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ukh6eodw9n");
          `}
        </Script>
      </head>
      
      <body className={cn(geistSans.variable, geistMono.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <div className="w-full max-w-[1000px] h-screen mx-auto p-6 flex flex-col relative">
            <div
              className="absolute top-0 flex items-center justify-center w-1/3 pointer-events-none -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square"
              aria-hidden="true"
            >
              <div className="absolute inset-0 translate-z-0 bg-primary rounded-full blur-[120px] opacity-70" />
              <div className="absolute w-1/4 h-1/4 translate-z-0 bg-primary rounded-full blur-[40px]" />
            </div>

            <Header />

            {children}

            <Footer />
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
