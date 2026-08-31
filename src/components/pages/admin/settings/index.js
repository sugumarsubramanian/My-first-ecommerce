import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function SettingsPage() {
  const user = useSelector((state) => state.auth.user)
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' })
  const [notice, setNotice] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNotice('There is no backend endpoint to save these changes yet — this form is UI-only for now.')
  }

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Settings</h2>
      {notice && (
        <p className='text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mb-4'>{notice}</p>
      )}
      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors shadow-md'
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default SettingsPage
