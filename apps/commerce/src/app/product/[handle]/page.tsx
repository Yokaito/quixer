import { api } from '@/sdk/lib/trpc/server';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    handle: string;
  };
}

export async function generateMetadata({
  params
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await api.product.getByHandle({
    handle: params.handle
  });

  if (!product) return notFound();

  const { url, width, height, altText: alt = product.title } = product.featuredImage || {};

  return {
    metadataBase: new URL(`/product/${product.handle}`, 'http://localhost:3000'),
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await api.product.getByHandle({
    handle: params.handle
  });

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="container flex flex-col gap-6">{product.title}</div>
    </>
  );
}
