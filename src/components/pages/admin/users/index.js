import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const API_URL = process.env.REACT_APP_BKEND_URL

function UsersPage() {
  const authToken = useSelector((state) => state.auth.authToken)
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_URL}/auth/users`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Failed to fetch users')
          return
        }

        setUsers(data.users)
      } catch (err) {
        console.error('Fetch users error', err)
        setError('Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [authToken])

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Users</h2>
      {isLoading && <p className='text-sm text-gray-500'>Loading...</p>}
      {error && <p className='text-sm text-red-500'>{error}</p>}
      {!isLoading && !error && (
        <>
          <p className='text-sm text-gray-600 mb-4'>
            Total registered users: <span className='font-semibold'>{users.length}</span>
          </p>
          <div className='overflow-x-auto'>
            <table className='w-full text-sm text-left'>
              <thead>
                <tr className='border-b border-gray-200 text-gray-500 text-xs uppercase'>
                  <th className='py-2 pr-4'>Name</th>
                  <th className='py-2 pr-4'>Email</th>
                  <th className='py-2 pr-4'>Role</th>
                  <th className='py-2 pr-4'>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className='border-b border-gray-100'>
                    <td className='py-2 pr-4'>{u.name}</td>
                    <td className='py-2 pr-4'>{u.email}</td>
                    <td className='py-2 pr-4 capitalize'>{u.role}</td>
                    <td className='py-2 pr-4'>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default UsersPage
