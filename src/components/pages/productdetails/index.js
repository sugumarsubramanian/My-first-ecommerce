import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../redux/slices/cartSlice'
import { clearCurrentProduct, fetchProductById } from '../../../redux/slices/productSlice'

function ProductDetailsPage() {
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { currentProduct: product, productStatus, productError } = useSelector((state) => state.products)
  const isLoading = productStatus === 'loading' || productStatus === 'idle'
  const [added, setAdded] = useState(false)

  useEffect(() => {
    setAdded(false)
    dispatch(fetchProductById(productId))
    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [dispatch, productId])

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (isLoading) {
    return <p className='text-sm text-gray-500'>Loading...</p>
  }

  if (productError) {
    return (
      <div className='max-w-md mx-auto bg-white rounded-md shadow-md p-6 text-center'>
        <p className='text-sm text-red-500 mb-4'>{productError}</p>
        <Link to='/products' className='text-blue-500 hover:text-blue-700 font-medium text-sm'>
          Back to Products
        </Link>
      </div>
    )
  }

  const name = product.name || product.title

  return (
    <div className='max-w-4xl mx-auto'>
      <Link to='/products' className='inline-block text-sm text-blue-500 hover:text-blue-700 font-medium mb-4'>
        ← Back to Products
      </Link>
      <div className='bg-white rounded-md shadow-md p-6 flex flex-col md:flex-row gap-6'>
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={name}
            className='w-full md:w-72 h-72 object-cover rounded-md'
          />
        ) : (
          <div className='w-full md:w-72 h-72 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-400'>
            No Image
          </div>
        )}

        <div className='flex-1'>
          <p className='text-xs text-gray-500 uppercase mb-1'>{product.category}</p>
          <h1 className='text-xl font-bold text-gray-800 mb-2'>{name}</h1>

          <div className='flex items-center gap-3 mb-3'>
            <p className='text-lg font-semibold text-blue-600'>₹{product.price}</p>
            {typeof product.rating === 'number' && (
              <span className='text-sm text-yellow-600'>★ {product.rating.toFixed(1)}</span>
            )}
            {typeof product.stock === 'number' && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            )}
          </div>

          {product.description && (
            <p className='text-sm text-gray-600 mb-4'>{product.description}</p>
          )}

          {product.brand && (
            <p className='text-xs text-gray-500 mb-4'>Brand: {product.brand}</p>
          )}

          <button
            type='button'
            onClick={handleAddToCart}
            className={`text-sm font-medium py-2 px-6 rounded-md transition-colors shadow-md ${
              added ? 'bg-green-500 text-white' : 'bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white'
            }`}
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
