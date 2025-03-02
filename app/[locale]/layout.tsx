import "../globals.css";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Providers } from "@/components/Providers";
import { getDirection } from "@/lib/i18n/getDirection";
import clsx from "clsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return {
    title: {
      default:
        locale === "ar"
          ? "جمعية العطاوية"
          : locale === "fr"
          ? "Association ElAttaouia"
          : "El Attaouia Association",
      template:
        "%s | " +
        (locale === "ar"
          ? "جمعية العطاوية"
          : locale === "fr"
          ? "Association ElAttaouia"
          : "El Attaouia Association"),
    },
    description: {
      default:
        locale === "ar"
          ? "منصة لمشاركة المبادرات والأنشطة الخيرية والإنسانية لجمعية العطاوية"
          : locale === "fr"
          ? "Plateforme pour partager les initiatives et activités caritatives et humanitaires de l'Association El Attaouia"
          : "Platform for sharing charitable and humanitarian initiatives and activities of El Attaouia Association",
    },
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body
        className={clsx(
          inter.variable,
          notoSansArabic.variable,
          "min-h-screen flex flex-col",
          {
            "font-sans": locale !== "ar",
            "font-arabic": locale === "ar",
          }
        )}
      >
        <Providers locale={locale}>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
