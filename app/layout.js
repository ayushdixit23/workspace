import { Nunito } from 'next/font/google'

const nunito = Nunito({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Providers";
import TokenDataWrapper from "./utils/Tokenwrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workspace",
  description: "Created By Grovyo Platforms Ltd",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} select-none ${nunito.variable}`}>
        <Providers>
          <TokenDataWrapper>{children}</TokenDataWrapper>
        </Providers>
      </body>
    </html>
  );
}
