
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-0">{children}</main>
      <Footer />
    </div>
  );
};
