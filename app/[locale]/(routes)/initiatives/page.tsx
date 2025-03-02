import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
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
import { Badge } from "@/components/ui/badge";

const translations = {
  title: {
    en: "Our Initiatives",
    fr: "Nos Initiatives",
    ar: "مبادراتنا",
  },
  description: {
    en: "Discover the community-centered projects and programs we undertake to create positive change in El Attaouia.",
    fr: "Découvrez les projets et programmes centrés sur la communauté que nous entreprenons pour créer un changement positif à El Attaouia.",
    ar: "اكتشف المشاريع والبرامج المتمحورة حول المجتمع التي نقوم بها لإحداث تغيير إيجابي في العطاوية.",
  },
  statusLabels: {
    planned: {
      en: "Planned",
      fr: "Planifié",
      ar: "مخطط",
    },
    "in-progress": {
      en: "In Progress",
      fr: "En cours",
      ar: "قيد التنفيذ",
    },
    completed: {
      en: "Completed",
      fr: "Terminé",
      ar: "مكتمل",
    },
    ongoing: {
      en: "Ongoing",
      fr: "En cours",
      ar: "مستمر",
    },
  },
  readMore: {
    en: "Learn More",
    fr: "En savoir plus",
    ar: "اقرأ المزيد",
  },
  noInitiatives: {
    en: "No initiatives available at the moment. Check back soon!",
    fr: "Aucune initiative disponible pour le moment. Revenez bientôt !",
    ar: "لا توجد مبادرات متاحة حاليًا. تحقق مرة أخرى قريبًا!",
  },
};

// Sample mock data for initiatives
const mockInitiatives = [
  {
    _id: "1",
    title: "Community Garden Project",
    slug: { current: "community-garden-project" },
    mainImage: "/images/placeholder-initiative.jpg",
    excerpt:
      "Creating sustainable urban gardens to promote healthy eating and community engagement.",
    status: "in-progress",
  },
  {
    _id: "2",
    title: "Youth Skills Workshop",
    slug: { current: "youth-skills-workshop" },
    mainImage: "/images/placeholder-initiative.jpg",
    excerpt:
      "Training workshops teaching practical skills to young people to enhance employability.",
    status: "ongoing",
  },
  {
    _id: "3",
    title: "Clean Water Initiative",
    slug: { current: "clean-water-initiative" },
    mainImage: "/images/placeholder-initiative.jpg",
    excerpt:
      "Improving access to clean drinking water in underserved areas of our community.",
    status: "completed",
  },
  {
    _id: "4",
    title: "Digital Literacy Program",
    slug: { current: "digital-literacy-program" },
    mainImage: "/images/placeholder-initiative.jpg",
    excerpt:
      "Teaching essential computer skills to help bridge the digital divide.",
    status: "planned",
  },
];

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

export default async function InitiativesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // In a real app, fetch initiatives from Sanity
  // const initiatives = await client.fetch(getAllInitiativesQuery, { language: locale });
  const initiatives = mockInitiatives;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "ongoing":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {translations.title[locale as keyof typeof translations.title]}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {
            translations.description[
              locale as keyof typeof translations.description
            ]
          }
        </p>
      </header>

      {initiatives.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.map((initiative) => (
            <Card
              key={initiative._id}
              className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={
                    typeof initiative.mainImage === "string"
                      ? initiative.mainImage
                      : urlForImage(initiative.mainImage) ||
                        "/images/placeholder.jpg"
                  }
                  alt={initiative.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={`${getStatusColor(initiative.status)}`}>
                    {
                      translations.statusLabels[
                        initiative.status as keyof typeof translations.statusLabels
                      ][
                        locale as keyof (typeof translations.statusLabels)["planned"]
                      ]
                    }
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link
                    href={`/${locale}/initiatives/${initiative.slug.current}`}
                  >
                    {initiative.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground line-clamp-3">
                  {initiative.excerpt}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={`/${locale}/initiatives/${initiative.slug.current}`}
                  >
                    {
                      translations.readMore[
                        locale as keyof typeof translations.readMore
                      ]
                    }
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {
              translations.noInitiatives[
                locale as keyof typeof translations.noInitiatives
              ]
            }
          </p>
        </div>
      )}
    </div>
  );
}
