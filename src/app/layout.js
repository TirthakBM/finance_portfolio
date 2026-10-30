import { Inter, Anton, Bebas_Neue, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-bebas" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces" });

export const metadata = {
  title: "Tirthak — The Series",
  description:
    "Portfolio of Tirthak Bhushan Majalkar — aspiring Investment Banking Operations professional with a background in software development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-ink">
      <body className={`${inter.variable} ${anton.variable} ${bebas.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
