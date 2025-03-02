import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { getPostBySlugQuery } from "@/lib/sanity/queries";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@portabletext/react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const { slug, locale } = params;
  const post = await client.fetch(getPostBySlugQuery, {
    slug,
    language: locale,
  });

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: post.mainImage ? [urlForImage(post.mainImage)] : [],
    },
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlForImage(value)}
            alt={value.alt || " "}
            fill
            className="object-contain"
          />
          {value.caption && (
            <div className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const { slug, locale } = params;
  const post = await client.fetch(getPostBySlugQuery, {
    slug,
    language: locale,
  });

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === "en" ? "en-US" : locale === "fr" ? "fr-FR" : "ar-MA",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <article className="container mx-auto py-12 px-4">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft size={16} />
        <span className="ml-1">
          {locale === "ar"
            ? "العودة إلى المدونة"
            : locale === "fr"
            ? "Retour au blog"
            : "Back to Blog"}
        </span>
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        <div className="flex items-center text-muted-foreground mb-8">
          {post.author?.image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
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
          <div>
            <div className="font-medium">{post.author?.name}</div>
            <div className="text-sm">{formattedDate}</div>
          </div>
        </div>

        {post.mainImage && (
          <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={urlForImage(post.mainImage) || "/images/placeholder.jpg"}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-12">
          {post.categories.map((category: string) => (
            <span
              key={category}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      )}

      {post.relatedPosts?.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">
            {locale === "ar"
              ? "منشورات ذات صلة"
              : locale === "fr"
              ? "Articles connexes"
              : "Related Posts"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {post.relatedPosts.map((relatedPost: any) => (
              <Card key={relatedPost._id}>
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      urlForImage(relatedPost.mainImage) ||
                      "/images/placeholder.jpg"
                    }
                    alt={relatedPost.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="pt-4">
                  <Link
                    href={`/${locale}/blog/${relatedPost.slug.current}`}
                    className="font-medium hover:text-blue-600"
                  >
                    {relatedPost.title}
                  </Link>
                  <div className="text-sm text-muted-foreground mt-1">
                    {new Date(relatedPost.publishedAt).toLocaleDateString(
                      locale === "en"
                        ? "en-US"
                        : locale === "fr"
                        ? "fr-FR"
                        : "ar-MA",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
