import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity/image";

interface BlogCardProps {
  post: {
    _id: string;
    slug: { current: string };
    title: string;
    mainImage: any;
    publishedAt: string;
    excerpt: string;
    author: { name: string; image: any };
  };
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 w-full">
        <Image
          src={urlForImage(post.mainImage) || "/images/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/${locale}/blog/${post.slug.current}`}>
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {post.author?.image && (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={
                  urlForImage(post.author.image) ||
                  "/images/placeholder-author.jpg"
                }
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span>
            {post.author?.name}, {formattedDate}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
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
  );
}
