import type { Metadata } from "next";

import { Poppins} from "next/font/google";

import "@/assets/css/index.css"; 

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Kartika",
    absolute: "Kartika",
  },
  description: "kartika catering",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        {children}
        {modal}
      </body>
    </html>
  );
}
  