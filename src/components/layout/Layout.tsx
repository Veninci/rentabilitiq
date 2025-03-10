
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle className="shadow-md bg-background/80 backdrop-blur-sm" />
      </div>
      <Navbar />
      <main className="flex-grow pt-16 md:pt-0">{children}</main>
      <Footer />
    </div>
  );
};
