import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: any) => {
  if (!source || !source.asset) {
    return null;
  }

  return imageBuilder.image(source).auto("format").fit("max");
};
