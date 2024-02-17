import Link from 'next/link';

export default async function HomePage() {
  return (
    <div className="flex flex-col">
      <span>Home</span>
      <Link href="/product/camiseta-de-manga-longa">Produto Teste</Link>
    </div>
  );
}
