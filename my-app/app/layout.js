import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation/navigation";
import { Providers } from './providers'
import { Box } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Panya",
  description: "Rock Climbing Log",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box backgroundColor="#f5f5f5"height="100vh" width="100%">
          <Providers>
            <Navigation />
            {children}
          </Providers>
        </Box>
      </body>
    </html>
  );
}
