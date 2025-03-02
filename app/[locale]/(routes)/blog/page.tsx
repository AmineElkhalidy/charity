import { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { getAllPostsQuery } from "@/lib/sanity/queries";
import { BlogList } from "@/components/blog/BlogList";

const translations = {
  title: {
    en: "Blog",
    fr: "Blog",
    ar: "المدونة",
  },
  description: {
    en: "Read the latest news and updates from El Attaouia Association",
    fr: "Lisez les dernières nouvelles et mises à jour de l'Association El Attaouia",
    ar: "اقرأ أحدث الأخبار والتحديثات من جمعية العطاوية",
  },
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: translations.title[locale as keyof typeof translations.title],
    description:
      translations.description[locale as keyof typeof translations.description],
  };
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const posts = await client.fetch(getAllPostsQuery, { language: locale });

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {translations.title[locale as keyof typeof translations.title]}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {
            translations.description[
              locale as keyof typeof translations.description
            ]
          }
        </p>
      </header>

      {posts.length > 0 ? (
        <BlogList posts={posts} locale={locale} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {locale === "ar"
              ? "لا توجد منشورات متاحة حاليًا. تحقق مرة أخرى قريبًا!"
              : locale === "fr"
              ? "Aucun article disponible pour le moment. Revenez bientôt !"
              : "No posts available at the moment. Check back soon!"}
          </p>
        </div>
      )}
    </div>
  );
}
