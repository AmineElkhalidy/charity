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
import { Calendar, Clock, MapPin } from "lucide-react";

const translations = {
  title: {
    en: "Events",
    fr: "Événements",
    ar: "الفعاليات",
  },
  description: {
    en: "Join us at our upcoming events and activities in El Attaouia and surrounding areas.",
    fr: "Rejoignez-nous lors de nos prochains événements et activités à El Attaouia et dans les environs.",
    ar: "انضم إلينا في الفعاليات والأنشطة القادمة في العطاوية والمناطق المحيطة.",
  },
  upcoming: {
    en: "Upcoming Events",
    fr: "Événements à venir",
    ar: "الفعاليات القادمة",
  },
  past: {
    en: "Past Events",
    fr: "Événements passés",
    ar: "الفعاليات السابقة",
  },
  details: {
    en: "View Details",
    fr: "Voir les détails",
    ar: "عرض التفاصيل",
  },
  noEvents: {
    en: "No events available at the moment. Check back soon!",
    fr: "Aucun événement disponible pour le moment. Revenez bientôt !",
    ar: "لا توجد فعاليات متاحة حاليًا. تحقق مرة أخرى قريبًا!",
  },
};

// Sample mock data for events
const mockEvents = [
  {
    _id: "1",
    title: "Annual Charity Gala",
    slug: { current: "annual-charity-gala" },
    mainImage: "/images/placeholder-event.jpg",
    excerpt:
      "Join us for an evening of celebration and fundraising to support our community initiatives.",
    startDateTime: "2025-03-15T18:00:00Z",
    endDateTime: "2025-03-15T22:00:00Z",
    location: {
      name: "Grand Hall",
      address: "123 Main Street",
      city: "El Attaouia",
    },
  },
  {
    _id: "2",
    title: "Community Clean-up Day",
    slug: { current: "community-cleanup-day" },
    mainImage: "/images/placeholder-event.jpg",
    excerpt:
      "Help beautify our town by participating in our quarterly clean-up event.",
    startDateTime: "2025-03-22T09:00:00Z",
    endDateTime: "2025-03-22T13:00:00Z",
    location: {
      name: "Town Center",
      address: "Central Plaza",
      city: "El Attaouia",
    },
  },
  {
    _id: "3",
    title: "Youth Leadership Workshop",
    slug: { current: "youth-leadership-workshop" },
    mainImage: "/images/placeholder-event.jpg",
    excerpt:
      "A workshop designed to develop leadership skills in young people aged 15-21.",
    startDateTime: "2025-04-05T10:00:00Z",
    endDateTime: "2025-04-05T16:00:00Z",
    location: {
      name: "Community Center",
      address: "45 Education Ave",
      city: "El Attaouia",
    },
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

export default async function EventsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // In a real app, fetch events from Sanity
  // const events = await client.fetch(getAllEventsQuery, { language: locale });
  const events = mockEvents;

  // Format date based on locale
  const formatDate = (dateString: string, locale: string) => {
    return new Date(dateString).toLocaleDateString(
      locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  // Format time based on locale
  const formatTime = (dateString: string, locale: string) => {
    return new Date(dateString).toLocaleTimeString(
      locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
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

      <h2 className="text-2xl font-bold mb-8">
        {translations.upcoming[locale as keyof typeof translations.upcoming]}
      </h2>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card
              key={event._id}
              className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                <div className="relative md:h-full h-48">
                  <Image
                    src={
                      typeof event.mainImage === "string"
                        ? event.mainImage
                        : urlForImage(event.mainImage) ||
                          "/images/placeholder.jpg"
                    }
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      <Link href={`/${locale}/events/${event.slug.current}`}>
                        {event.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.excerpt}
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>{formatDate(event.startDateTime, locale)}</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>
                          {formatTime(event.startDateTime, locale)} -{" "}
                          {formatTime(event.endDateTime, locale)}
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>
                          {event.location.name}, {event.location.city}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/${locale}/events/${event.slug.current}`}>
                        {
                          translations.details[
                            locale as keyof typeof translations.details
                          ]
                        }
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {
              translations.noEvents[
                locale as keyof typeof translations.noEvents
              ]
            }
          </p>
        </div>
      )}
    </div>
  );
}
