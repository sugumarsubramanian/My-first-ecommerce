import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const navLinkClasses = ({ isActive }) =>
  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
  }`

function AdminLayout() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div className='max-w-5xl mx-auto flex gap-6'>
      <aside className='w-56 shrink-0 bg-white rounded-md shadow-md p-4 h-fit'>
        <div className='mb-4'>
          <p className='text-sm text-gray-500'>Logged in as</p>
          <p className='font-semibold'>{user?.name}</p>
        </div>
        <nav className='space-y-1'>
          <NavLink to='profile' className={navLinkClasses}>Profile</NavLink>
          <NavLink to='settings' className={navLinkClasses}>Settings</NavLink>
          {user?.role === 'admin' && (
            <NavLink to='products' className={navLinkClasses}>Products</NavLink>
          )}
          <NavLink to='orders' className={navLinkClasses}>
            {user?.role === 'admin' ? 'Orders' : 'Order History'}
          </NavLink>
          {user?.role === 'admin' && (
            <NavLink to='users' className={navLinkClasses}>Users</NavLink>
          )}
        </nav>
      </aside>
      <section className='flex-1 bg-white rounded-md shadow-md p-6'>
        <Outlet />
      </section>
    </div>
  )
}

export default AdminLayout
