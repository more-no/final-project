import LogoutLink from '../(auth)/logout/LogoutLink';
import Link from 'next/link';
import Theme from './ThemeSwitch';

export type UserLoggedIn = {
  username: string | string[];
};

export default function HeaderLogged(props: UserLoggedIn) {
  if (props.username === 'admin') {
    return (
      <header className="header header-center bg-base-200 text-base-content rounded Text Size 2">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <img src="/logo-transp-bg.png" alt="logo" width="80" height="80" />
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/user/admin">Admin</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/user/admin">Admin</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end p-5">
            <Theme />
          </div>
          <div className="dropdown dropdown-end">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href={`/user/${props.username}`}>My Profile</Link>
              </li>
              <li />
              <li>
                <LogoutLink />
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header className="header header-center bg-base-200 text-base-content rounded Text Size 2">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <img src="/logo-transp-bg.png" alt="logo" width="80" height="80" />
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={`/user/${props.username}`}>My Profile</Link>
                </li>
                <li>
                  <Link href={`/map/${props.username}`}>Map</Link>
                </li>
                <li>
                  <Link href={`/search/${props.username}`}>Find your Host</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href={`/user/${props.username}`}>My Profile</Link>
              </li>
              <li>
                <Link href={`/map/${props.username}`}>Map</Link>
              </li>
              <li>
                <Link href={`/search/${props.username}`}>Find your Host</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end p-5">
            <Theme />
          </div>
          <div className="dropdown dropdown-end">
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <span className="justify-between">{`${props.username}`}</span>
              </li>
              <li />
              <li>
                <Link href={`/edit/${props.username}`}>Edit Profile</Link>
              </li>
              <li>
                <span className="justify-between">
                  Contacts
                  <span className="badge">Soon!</span>
                </span>
              </li>
              <li>
                <span className="justify-between">
                  Messages
                  <span className="badge">Soon!</span>
                </span>
              </li>
              <li>
                <span className="justify-between">
                  Communities
                  <span className="badge">Soon!</span>
                </span>
              </li>
              <li />
              <li>
                <Link href={`/account/${props.username}`}>Account</Link>
              </li>
              <li>
                <LogoutLink />
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
