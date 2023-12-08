import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const Header = () => {
  async function handleSearch(e: FormData) {
    'use server';
    const query = e.get('search') as string;

    if (query) {
      const url = `/search?q=${encodeURIComponent(query)}`;

      redirect(url);
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-slate-950">
        <div className="container flex flex-row justify-between text-slate-300">
          <nav className="hidden gap-4 lg:flex">
            <Link className="p-1 pl-0 transition-colors hover:text-slate-400" href="/">
              Size Guide
            </Link>
            <div className="h-full w-[1px] bg-slate-300" />
            <Link className="p-1 transition-colors hover:text-slate-400" href="/">
              Contact Us
            </Link>
            <div className="h-full w-[1px] bg-slate-300" />
          </nav>
          <Link
            className="flex flex-grow items-center justify-center truncate p-1 text-sm transition-colors hover:text-slate-400 lg:text-base"
            href="/"
          >
            Complimentary Shipping on All Orders Within Australia
          </Link>
          <nav className="hidden gap-4 lg:flex">
            <div className="h-full w-[1px] bg-slate-300" />
            <Link className="p-1 transition-colors hover:text-slate-400" href="/">
              My Account
            </Link>
            <div className="h-full w-[1px] bg-slate-300" />
            <Link className="p-1 pr-0 transition-colors hover:text-slate-400" href="/">
              Help Center
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-white py-3 shadow-sm lg:py-0">
        <div className="container flex h-full min-h-[35px] flex-row justify-between text-slate-950 lg:min-h-[60px]">
          <div>Menus</div>
          <Link className="flex flex-grow items-center justify-center" href="/">
            <Image
              className="h-full w-24 lg:h-full lg:w-28"
              alt="Logo"
              height={120}
              width={120}
              src="/vercel.svg"
            />
          </Link>
          <div>Inputs, Cart</div>
        </div>
        <div className="container flex lg:hidden">
          <form action={handleSearch} className="w-full">
            <input
              type="text"
              name="search"
              id="mobile-menu"
              placeholder="Search for your products"
              className="w-full rounded-sm border border-slate-300 p-2 text-sm text-slate-950 focus:outline focus:outline-offset-2 focus:outline-slate-950"
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
