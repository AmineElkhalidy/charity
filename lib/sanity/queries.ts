import { groq } from "next-sanity";

export const getAllPostsQuery = groq`
  *[_type == "post" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    excerpt,
    "categories": categories[]->title,
    "author": author->{name, image}
  }
`;

export const getPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    mainImage,
    body,
    publishedAt,
    "categories": categories[]->title,
    "author": author->{name, image},
    "relatedPosts": *[_type == "post" && language == $language && references(^._id)] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt
    }
  }
`;
