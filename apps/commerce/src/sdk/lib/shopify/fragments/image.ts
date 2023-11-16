export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
  }
`;
