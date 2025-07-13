import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YANIS GREK",
  description: "Yanis Grek - премиальный автосервис BMW в Москве",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      <a href="https://wa.me/79852707575" target="_blank" className="whatsapp">
        <svg width="28" height="28" viewBox="0 0 44 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.028 14.0123C10.2565 12.2048 12.6055 9.74828 14.4698 10.0209L14.4668 10.0179C16.281 10.3626 17.7172 13.4852 18.527 14.8893C19.1008 15.908 18.7282 16.9402 18.193 17.3757C17.471 17.9577 16.342 18.7606 16.5789 19.5668C17 21 22 26 24.4592 27.4214C25.39 27.9594 26.065 26.5404 26.6414 25.8134C27.0602 25.2542 28.0932 24.92 29.1096 25.472C30.6276 26.356 32.0576 27.3834 33.38 28.54C34.0404 29.092 34.1954 29.9078 33.7378 30.77C32.9318 32.2886 30.6006 34.2912 28.9084 33.8842C25.9528 33.1736 14 28.54 10.1607 15.116C9.94474 14.481 9.9991 14.2409 10.028 14.0123Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M22 44C19.5528 44 18.1988 43.7374 16 43L11.7889 45.1056C9.12924 46.4354 6 44.5014 6 41.5278V37C1.6931 32.984 0 28.3534 0 22C0 9.84974 9.84974 0 22 0C34.1502 0 44 9.84974 44 22C44 34.1502 34.1502 44 22 44ZM10 35.2606L8.7279 34.0744C5.38174 30.9544 4 27.4662 4 22C4 12.0589 12.0589 4 22 4C31.9412 4 40 12.0589 40 22C40 31.9412 31.9412 40 22 40C20.0286 40 19.104 39.822 17.2719 39.2076L15.6969 38.6794L10 41.5278V35.2606Z" fill="white"/>
        </svg>
      </a>
      </body>
    </html>
  );
}
