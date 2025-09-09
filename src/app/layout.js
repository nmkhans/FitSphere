import { Outfit, Lato } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./provider/NextAuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const outfitSans = Outfit({
    variable: "--font-outfit-sans",
    subsets: ["latin"],
});

const latoSans = Lato({
    variable: "--font-lato-sans",
    weight: ["300", "400", "700"],
    subsets: ["latin"],
});

export const metadata = {
    title: "FitSphere",
    description: "FitSphere is a Gym Management Website to manage gym activities.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfitSans.variable} ${latoSans.variable} antialiased`}
      >
        <NextAuthProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: '#4ade80',
                },
              },
              error: {
                duration: 4000,
                theme: {
                  primary: '#ef4444',
                },
              },
            }}
          />
        </NextAuthProvider>
      </body>
    </html>
  );
}
