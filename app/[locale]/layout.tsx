import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Providers } from "@/components/Providers";
import { getDirection } from "@/lib/i18n/getDirection";
import clsx from "clsx";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const locale = await params.locale;
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = await params.locale;
  const direction = getDirection(locale);

  return (
    <div
      className={clsx("min-h-screen flex flex-col", {
        "font-sans": locale !== "ar",
        "font-arabic": locale === "ar",
      })}
      style={{
        direction: direction, // This explicitly sets the direction
      }}
      lang={locale}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = "${locale}";
            document.documentElement.dir = "${direction}";
          `,
        }}
      />
      <Providers locale={locale}>
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </Providers>
    </div>
  );
}
