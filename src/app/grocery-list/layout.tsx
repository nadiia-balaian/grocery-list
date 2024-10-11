'use client';
import { Footer } from '@/components/Footer';
import React from 'react';

export default function GroceryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 min-w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

