import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { getAllPostsQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const translations = {
  hero: {
    title: {
      en: "Building a Better Community Together",
      fr: "Construire une meilleure communauté ensemble",
      ar: "نبني معًا مجتمعًا أفضل",
    },
    subtitle: {
      en: "El Attaouia Association is dedicated to charitable and humanitarian initiatives in our community.",
      fr: "L'Association El Attaouia est dédiée aux initiatives caritatives et humanitaires dans notre communauté.",
      ar: "جمعية العطاوية مكرسة للمبادرات الخيرية والإنسانية في مجتمعنا.",
    },
    cta: {
      en: "Learn More",
      fr: "En savoir plus",
      ar: "اكتشف المزيد",
    },
  },
  featuredPosts: {
    title: {
      en: "Latest Initiatives",
      fr: "Dernières initiatives",
      ar: "أحدث المبادرات",
    },
    viewAll: {
      en: "View All Initiatives",
      fr: "Voir toutes les initiatives",
      ar: "عرض كل المبادرات",
    },
  },
  upcomingEvents: {
    title: {
      en: "Upcoming Events",
      fr: "Événements à venir",
      ar: "الفعاليات القادمة",
    },
    viewAll: {
      en: "View All Events",
      fr: "Voir tous les événements",
      ar: "عرض كل الفعاليات",
    },
  },
};

export default async function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = await params.locale;
  const posts = await client.fetch(getAllPostsQuery, { language: locale });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
            {
              translations.hero.title[
                locale as keyof typeof translations.hero.title
              ]
            }
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 text-blue-100">
            {
              translations.hero.subtitle[
                locale as keyof typeof translations.hero.subtitle
              ]
            }
          </p>
          <Button
            asChild
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            <Link href={`/${locale}/about`}>
              {
                translations.hero.cta[
                  locale as keyof typeof translations.hero.cta
                ]
              }
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Posts/Initiatives */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {
                translations.featuredPosts.title[
                  locale as keyof typeof translations.featuredPosts.title
                ]
              }
            </h2>
            <Button asChild variant="outline">
              <Link href={`/${locale}/initiatives`}>
                {
                  translations.featuredPosts.viewAll[
                    locale as keyof typeof translations.featuredPosts.viewAll
                  ]
                }
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.slice(0, 3).map((post: any) => (
              <Card
                key={post._id}
                className="overflow-hidden flex flex-col h-full"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={urlForImage(post.mainImage) || "/placeholder.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.publishedAt).toLocaleDateString(
                      locale === "en"
                        ? "en-US"
                        : locale === "fr"
                        ? "fr-FR"
                        : "ar-MA",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/${locale}/blog/${post.slug.current}`}>
                      {locale === "ar"
                        ? "اقرأ المزيد"
                        : locale === "fr"
                        ? "Lire la suite"
                        : "Read More"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {
                translations.upcomingEvents.title[
                  locale as keyof typeof translations.upcomingEvents.title
                ]
              }
            </h2>
            <Button asChild variant="outline">
              <Link href={`/${locale}/events`}>
                {
                  translations.upcomingEvents.viewAll[
                    locale as keyof typeof translations.upcomingEvents.viewAll
                  ]
                }
              </Link>
            </Button>
          </div>

          {/* Event Cards would go here - similar structure to posts */}
        </div>
      </section>
    </div>
  );
}
