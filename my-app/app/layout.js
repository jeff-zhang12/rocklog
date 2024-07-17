import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import { Providers } from './providers'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Panya",
  description: "Rock Climbing Log",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
