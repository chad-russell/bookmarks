import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookmarkProvider } from "@/context/BookmarkContext";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookmarks",
  description: "A simple bookmark manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BookmarkProvider>{children}</BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
