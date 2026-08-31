import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../../redux/slices/authSlice'

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response =   await fetch(
        `${process.env.REACT_APP_BKEND_URL}/auth/login`,
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:formData.email,
          password:formData.password,
        }),
      }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      dispatch(login(data));
      navigate("/admin");
    }catch (error){
      console.error("Login Error", error);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex items-center justify-center px-4 py-8'>
      <div className='w-full max-w-sm bg-white rounded-md shadow-md p-6'>
        <h1 className='text-lg font-bold text-center mb-6'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {error && (
            <p className='text-sm text-red-500 text-center'>{error}</p>
          )}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              placeholder='you@example.com'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              value={formData.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
              placeholder='••••••••'
            />
          </div>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium py-2 rounded-md transition-colors shadow-md'
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className='text-center text-sm text-gray-500 mt-4'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-blue-500 hover:text-blue-700 font-medium'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
