import type { Metadata } from "next";
import { Cinzel, Raleway } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel',
  weight: ['400', '700', '900']
});

const raleway = Raleway({ 
  subsets: ["latin"],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Lily's Place - Fine Dining Experience",
  description: "Experience authentic cuisine in a beautiful setting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${raleway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}