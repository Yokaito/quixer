import { SEO } from "./seo";

export type CollectionReshaped = Collection & {
  path: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};
