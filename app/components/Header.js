import Login from '../login/LoginForm';
import Link from 'next/link';
import Theme from './ThemeSwitch';

export default function Header() {
  return (
    <header className="header header-center bg-base-200 text-base-content rounded Text Size 2">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link className="normal-case text-xl ml-5" href="/">
            <img src="/logo-transp-bg.png" alt="logo" width="80" height="80" />
          </Link>
          <div className="dropdown">
            <div className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/about">About the Project</Link>
              </li>
              <li>
                <Link href="/how">How it works</Link>
              </li>
              <li>
                <Link href="/safety">Safety Tips</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/about" className="text-xl font-semibold">
                About the Project
              </Link>
            </li>
            <li>
              <Link href="/how" className="text-xl font-semibold">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/safety" className="text-xl font-semibold">
                Safety Tips
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end p-5">
          <Login />
        </div>
        <Theme />
      </div>
    </header>
  );
}
