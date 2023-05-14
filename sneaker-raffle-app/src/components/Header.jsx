import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  AiOutlineLogin, AiOutlineUserAdd, AiOutlineLogout,
} from 'react-icons/ai';
import { UserContext } from '../context/UserContext';

function Header() {
  const { user } = useContext(UserContext);
  console.log(user, 'userrrrrrrr');
  // const navItemStyle = 'flex items-center text-white py-2 px-4 bg-gra
  // dient-to-r from-pink-500 to-yellow-500 font-bold rounded hover:scale-105';
  const navItemStyle = 'flex items-center text-white py-2 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 font-bold rounded hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:scale-105 my-gradient-div';

  const headerStyle = 'bg-black shadow-md py-4 px-6';

  return (
    <header className={headerStyle}>
      <nav className="container w-full px-4 flex items-center justify-between">
        <NavLink to="/">

          <div className="text-2xl font-bold text-white hover:scale-110">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 grad-text">
              Drip Drop
            </span>
          </div>
        </NavLink>

        <ul className="flex space-x-4">
          {/* <li>
            <NavLink to="/admin" className={navItemStyle}>
              <AiOutlineInfoCircle className="mr-1" />
              Admin
            </NavLink>
          </li> */}
          {!user && (
            <>
              <li>
                <NavLink to="/login" className={navItemStyle}>
                  <AiOutlineLogin className="mr-1" />
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={navItemStyle}>
                  <AiOutlineUserAdd className="mr-1" />
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
            <>
              <li>
                <NavLink to="/profile" className={navItemStyle}>
                  Profile
                </NavLink>
              </li>

              <li>

                <NavLink to="/logout" className={navItemStyle}>
                  <AiOutlineLogout className="mr-1" />
                  Logout
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  );
}

export default Header;
