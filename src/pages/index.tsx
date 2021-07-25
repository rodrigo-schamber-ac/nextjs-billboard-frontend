import { FC } from 'react';
import 'tailwindcss/tailwind.css';

const Home: FC = () => {
  return (
    <div>
      <div id="login">
        <h1>First, log in to spotify</h1>
        <a href="/login">Log in</a>
      </div>
      <div id="loggedin"></div>
    </div>
  );
};

export default Home;
