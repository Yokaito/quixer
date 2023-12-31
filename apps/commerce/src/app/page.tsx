import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <span>Home</span>
      <Link href="/product/camiseta-de-manga-longa" prefetch>
        Produto Teste
      </Link>
    </div>
  );
}
