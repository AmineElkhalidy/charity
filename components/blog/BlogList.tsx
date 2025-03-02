import { BlogCard } from "./BlogCard";

interface BlogListProps {
  posts: any[];
  locale: string;
}

export function BlogList({ posts, locale }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} locale={locale} />
      ))}
    </div>
  );
}
