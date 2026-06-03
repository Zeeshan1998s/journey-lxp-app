import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/styles.css';
import './styles/pdf-styles.css';
import './styles/videos-styles.css';
import AppShell from './components/AppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Journey LXP',
  description: 'Journey Learning Experience Platform built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
