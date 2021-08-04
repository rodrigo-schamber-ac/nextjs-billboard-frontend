import { FC } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Home: FC = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6 bg-green-900">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Spotify API
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Refresh token
          </a>
        </div>
        <div>
          <Link href="/api/login">
            <a
              href="#"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Home;