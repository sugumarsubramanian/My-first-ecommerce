import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../redux/slices/cartSlice'
import { fetchCategories, fetchProducts } from '../../../redux/slices/productSlice'

const PAGE_SIZE = 8

function AllProducts() {
  const dispatch = useDispatch()
  const { items: products, pagination, categories, status, error } = useSelector((state) => state.products)
  const isLoading = status === 'loading'
  const [selectedCategory, setSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const [addedId, setAddedId] = useState(null)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    setAddedId(product.id)
    setTimeout(() => setAddedId((current) => (current === product.id ? null : current)), 1500)
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: PAGE_SIZE, category: selectedCategory }))
  }, [dispatch, page, selectedCategory])

  const handleSelectCategory = (category) => {
    setSelectedCategory(category)
    setPage(1)
  }

  const categoryLinkClasses = (isActive) =>
    `block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
    }`

  return (
    <div className='max-w-5xl mx-auto flex gap-6'>
      <aside className='w-48 shrink-0 bg-white rounded-md shadow-md p-4 h-fit'>
        <p className='text-xs font-semibold text-gray-500 uppercase mb-2'>Categories</p>
        <nav className='space-y-1'>
          <button
            type='button'
            onClick={() => handleSelectCategory('')}
            className={categoryLinkClasses(selectedCategory === '')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type='button'
              onClick={() => handleSelectCategory(category)}
              className={categoryLinkClasses(selectedCategory === category)}
            >
              {category}
            </button>
          ))}
        </nav>
      </aside>

      <div className='flex-1'>
        <h1 className='text-lg font-bold mb-4 capitalize'>
          {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
        </h1>
        {isLoading && <p className='text-sm text-gray-500'>Loading...</p>}
        {error && <p className='text-sm text-red-500'>{error}</p>}
        {!isLoading && !error && (
          <>
            {products.length === 0 ? (
              <p className='text-sm text-gray-500'>No products found.</p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {products.map((product) => (
                  <div
                    key={product._id}
                    className='bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col'
                  >
                    <Link to={`/product/${product.id}`}>
                      {product.thumbnail ? (
                        <img
                          src={product.thumbnail}
                          alt={product.name || product.title}
                          className='w-full h-32 object-cover rounded-md mb-3'
                        />
                      ) : (
                        <div className='w-full h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-xs text-gray-400'>
                          No Image
                        </div>
                      )}
                      <p className='font-semibold text-gray-800'>{product.name || product.title}</p>
                      <p className='text-xs text-gray-500 mb-2'>{product.category}</p>
                      <p className='text-sm font-medium text-blue-600'>₹{product.price}</p>
                    </Link>
                    <button
                      type='button'
                      onClick={() => handleAddToCart(product)}
                      className={`mt-3 text-sm font-medium py-1.5 rounded-md transition-colors ${
                        addedId === product.id
                          ? 'bg-green-500 text-white'
                          : 'bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white'
                      }`}
                    >
                      {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className='flex items-center justify-center gap-4 mt-6'>
              <button
                type='button'
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page <= 1}
                className='text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-md transition-colors'
              >
                Previous
              </button>
              <span className='text-sm text-gray-600'>
                Page {page} of {pagination.totalPages}
              </span>
              <button
                type='button'
                onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                disabled={page >= pagination.totalPages}
                className='text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-1.5 rounded-md transition-colors'
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AllProducts
