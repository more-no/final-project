import type { Metadata } from 'next';
import { ReactNode } from 'react';
import Header from './components/Header';
import HeaderLogged from './components/HeaderLogged';
import Footer from './components/Footer';
import { Theme } from './components/ThemeProvider';
import './globals.css';
import { cookies } from 'next/headers';
import { getUserBySessionToken } from '../database/users';
import FooterLogged from './components/FooterLogged';

export const metadata: Metadata = {
  title: {
    default: 'Home Page | OpenTribe',
    template: '%s | OpenTribe',
  },
  description: 'Created with Next.js',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <html lang="en" data-theme="autumn">
      <body>
        <Theme>
          {user ? <HeaderLogged username={user.username} /> : <Header />}
          <div className="min-h-screen bg-base-200">{props.children}</div>
          {user ? <FooterLogged /> : <Footer />}
        </Theme>
      </body>
    </html>
  );
}
