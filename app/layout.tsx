import "./globals.css";
import { inter, notoSansArabic } from "./fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable} ${notoSansArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
