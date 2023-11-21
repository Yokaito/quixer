import { api } from '@/sdk/lib/trpc/server';

export default async function HomePage() {
  const product = await api.product.getProductByHandle({
    handle: 'camiseta-de-manga-longa'
  });

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <span>{product?.title} Server Component</span>
    </div>
  );
}
