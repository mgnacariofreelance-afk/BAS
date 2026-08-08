import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'BAS — SMB Business System', description: 'Single-user SMB POS, inventory and financial management.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}