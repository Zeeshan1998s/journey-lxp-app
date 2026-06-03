import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/styles.css';
import './styles/pdf-styles.css';
import './styles/videos-styles.css';
import AppShell from './components/AppShell';
import { getUser } from './actions/gamification';
import AuthProvider from './components/AuthProvider';
import { JourneyProvider } from './contexts/JourneyContext';

export const runtime = 'nodejs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Journey LXP',
  description: 'Journey Learning Experience Platform built with Next.js',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <JourneyProvider>
            <AppShell initialUser={user}>
              {children}
            </AppShell>
          </JourneyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
