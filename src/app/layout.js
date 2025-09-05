import { Outfit, Lato } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}