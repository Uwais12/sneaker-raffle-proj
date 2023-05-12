import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  AiFillHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import useUser from '../hooks/useUser';

function Header() {
  const { user } = useUser();

  const navItemStyle = 'text-white hover:text-blue-300 transition-colors duration-200 transform hover:scale-105';
  const headerStyle = 'bg-transparent shadow-md py-4 px-6';

  return (
    <header className={headerStyle}>
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Drip Drop
          </span>
        </div>
        <ul className="flex space-x-4">
          <li>
            <NavLink to="/admin" className={navItemStyle}>
              <AiOutlineInfoCircle />
              {' '}
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={navItemStyle}>
              <AiFillHome />
              {' '}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navItemStyle}>
              <AiOutlineInfoCircle />
              {' '}
              About
            </NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to="/login" className={navItemStyle}>
                  <AiOutlineLogin />
                  {' '}
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={navItemStyle}>
                  <AiOutlineUserAdd />
                  {' '}
                  Register
                </NavLink>
              </li>
            </>
          )}
          {user
            && user.roles.map((role) => role.name).includes('ROLE_ADMIN') && (
              <li>
                <Link to="/admin" className={navItemStyle}>
                  Admin
                </Link>
              </li>
          )}
          {user && (
            <li>
              <NavLink to="/logout" className={navItemStyle}>
                <AiOutlineLogout />
                {' '}
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
