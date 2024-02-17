import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link className="p-2" href="/">
      <Image className="dark:hidden" src="/vercel.svg" alt="logo store" width={140} height={40} />
      <Image
        className="hidden dark:block"
        src="/vercel-white.svg"
        alt="logo store"
        width={140}
        height={40}
      />
    </Link>
  );
};
