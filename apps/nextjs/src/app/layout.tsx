import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/styles/globals.css";

import { cache } from "react";
import { headers } from "next/headers";

import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./_components/providers";

export const dynamic = "force-dynamic";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "BISO Elections",
  description: "BISO Hosted Elections platform covering all campuses",
  openGraph: {
    title: "BISO Elections",
    description: "BISO Hosted Elections platform covering all campuses",
    url: "https://github.com/MHEien/T3-Supa",
    siteName: "BISO Elections",
  },
};

// Lazy load headers
const getHeaders = cache(async () => headers());

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <TRPCReactProvider headersPromise={getHeaders()}>
          <Providers>
            {props.children}
            <Toaster />
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
