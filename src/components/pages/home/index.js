import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from '../login'
import { fetchProducts } from '../../../redux/slices/productSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const { items: products, status, error } = useSelector((state) => state.products)
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }))
  }, [dispatch])

  const productsSection = (
    <div className={isAuthenticated ? 'w-full' : 'w-full lg:w-[70%]'}>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-lg font-bold'>Products</h1>
        <Link
          to='/products'
          className='text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 px-3 py-1.5 rounded-md transition-colors'
        >
          Show All
        </Link>
      </div>
      {isLoading && <p className='text-sm text-gray-500'>Loading...</p>}
      {error && <p className='text-sm text-red-500'>{error}</p>}
      {!isLoading && !error && (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${isAuthenticated ? 'xl:grid-cols-6' : 'xl:grid-cols-5'}`}>
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product.id}`}
              className='block bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow'
            >
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name || product.title}
                  className='w-full h-24 object-cover rounded-md mb-3'
                />
              ) : (
                <div className='w-full h-24 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-xs text-gray-400'>
                  No Image
                </div>
              )}
              <p className='font-semibold text-gray-800 text-sm'>{product.name || product.title}</p>
              <p className='text-xs text-gray-500 mb-1'>{product.category}</p>
              <p className='text-sm font-medium text-blue-600'>₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )

  if (isAuthenticated) {
    return productsSection
  }

  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      {productsSection}
      <div className='w-full lg:w-[30%]'>
        <LoginPage />
      </div>
    </div>
  )
}

export default HomePage
