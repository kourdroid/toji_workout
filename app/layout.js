import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Toji Fushiguro Workout Program",
  description: "Train like the strongest sorcerer killer with this progressive calisthenics program",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="system">
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}>
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
