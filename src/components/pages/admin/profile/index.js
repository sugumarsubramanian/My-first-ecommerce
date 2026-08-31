import React from 'react'
import { useSelector } from 'react-redux'

function ProfilePage() {
  const user = useSelector((state) => state.auth.user)

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Profile</h2>
      <dl className='space-y-3'>
        <div>
          <dt className='text-xs font-medium text-gray-500 uppercase'>Name</dt>
          <dd className='text-sm text-gray-800'>{user?.name}</dd>
        </div>
        <div>
          <dt className='text-xs font-medium text-gray-500 uppercase'>Email</dt>
          <dd className='text-sm text-gray-800'>{user?.email}</dd>
        </div>
        <div>
          <dt className='text-xs font-medium text-gray-500 uppercase'>Role</dt>
          <dd className='text-sm text-gray-800 capitalize'>{user?.role}</dd>
        </div>
      </dl>
    </div>
  )
}

export default ProfilePage
