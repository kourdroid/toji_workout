import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import FloatingTimer from '@/app/components/FloatingTimer'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Toji Workout",
  description: "A workout app inspired by Toji Fushiguro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingTimer />
        </ThemeProvider>
      </body>
    </html>
  );
}
