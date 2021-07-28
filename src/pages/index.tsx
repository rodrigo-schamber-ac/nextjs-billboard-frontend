import { FC } from 'react';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';

const Home: FC = () => {
  return (
    <div className="container">
      <div id="login">
        <Link href="/api/login">
          <a className="btn btn-primary">Log in with Spotify</a>
        </Link>
      </div>
      <div id="loggedin">
        <div id="user-profile"></div>
        <div id="oauth"></div>
        <button className="btn btn-default" id="obtain-new-token">
          New token
        </button>
      </div>
    </div>
  );
};

export default Home;
