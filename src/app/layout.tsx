import Appbar from './components/Appbar';
import Providers from './components/Providers';
import './globals.css';
import { Inter } from 'next/font/google';
import { WalletProvider } from './context/WalletContext';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Safeout',
  description: 'Safeout - Make your items really yours',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <WalletProvider>
            <Header />
            {children}
          </WalletProvider>
        </Providers>
      </body>
    </html>
  );
}
