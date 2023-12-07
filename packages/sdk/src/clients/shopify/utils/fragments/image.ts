export const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url(transform: { preferredContentType: WEBP })
    altText
    width
    height
  }
`;
