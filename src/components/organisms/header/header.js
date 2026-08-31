import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/slices/authSlice'

const navLinkClasses = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-700 text-white' : 'text-green-100 hover:bg-blue-500 hover:text-white'
  }`

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartCount = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  const handleLogoClick = () => {
    navigate("/");
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }
  return (
    <header className='header bg-blue-400 bg-gradient-to-tr px-4 py-3 flex items-center justify-between shadow-md'>
      <div className='header-content'>
        <h1 onClick={handleLogoClick} className='text-lg font-bold text-white cursor-pointer'>Shopping App</h1>
      </div>
      <nav className='nav'>
        <ul className='flex items-center space-x-2'>
          <li>
            <NavLink to="/" end className={navLinkClasses}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={navLinkClasses}>
              <span className='relative inline-flex items-center'>
                Cart
                {cartCount > 0 && (
                  <span className='absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-bold leading-none rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center'>
                    {cartCount}
                  </span>
                )}
              </span>
            </NavLink>
          </li>
          {!isAuthenticated && (
            <li>
              <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
            </li>
          )}
          {isAuthenticated && (
            <>
              <li>
                <NavLink to="/admin" className={navLinkClasses}>Dashboard</NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className='px-3 py-2 rounded-md text-sm font-medium transition-colors text-green-100 hover:bg-blue-500 hover:text-white'
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
