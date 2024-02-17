import { Layout } from '@/layout';
import { TRPCReactProvider } from '@/sdk/lib/trpc/react';
import { isDarkTheme } from '@/sdk/utils/theme';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    absolute: 'Quixer',
    template: '%s | Quixer'
  },
  description: 'Generated by create next app',
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={isDarkTheme()}>
      <body className={inter.className}>
        <Suspense>
          <TRPCReactProvider headers={headers()}>
            <Layout>{children}</Layout>
          </TRPCReactProvider>
        </Suspense>
      </body>
    </html>
  );
}
