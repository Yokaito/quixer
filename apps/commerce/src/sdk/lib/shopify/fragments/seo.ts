export type SEO = {
  title: string;
  description: string;
};

export const seoFragment = /* GraphQL */ `
  fragment seo on SEO {
    description
    title
  }
`;
