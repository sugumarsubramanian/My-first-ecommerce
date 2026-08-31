import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, fetchProducts } from '../../../redux/slices/productSlice'

function AddNewProductPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const [formData, setFormData] = useState({ id: '', title: '', description: '', price: '', category: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    dispatch(fetchProducts({}))
  }, [dispatch])

  useEffect(() => {
    if (products.length > 0 && !formData.id) {
      const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0)
      setFormData((prev) => ({ ...prev, id: String(maxId + 1) }))
    }
  }, [products, formData.id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)
    try {
      await dispatch(
        addProduct({
          id: Number(formData.id),
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
        })
      ).unwrap()

      setSuccess('Product added successfully.')
      setFormData({ id: String(Number(formData.id) + 1), title: '', description: '', price: '', category: '' })
    } catch (err) {
      console.error('Add product error', err)
      setError(typeof err === 'string' ? err : 'Failed to add product')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>Add New Product</h2>
      {error && <p className='text-sm text-red-500 mb-4'>{error}</p>}
      {success && <p className='text-sm text-green-600 mb-4'>{success}</p>}
      <form onSubmit={handleSubmit} className='space-y-4 max-w-sm'>
        <div>
          <label htmlFor='id' className='block text-sm font-medium text-gray-700 mb-1'>Product ID</label>
          <input
            id='id'
            name='id'
            type='number'
            required
            value={formData.id}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <div>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
          <input
            id='title'
            name='title'
            type='text'
            required
            value={formData.title}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <div>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
          <textarea
            id='description'
            name='description'
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <div>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
          <input
            id='price'
            name='price'
            type='number'
            step='0.01'
            min='0'
            required
            value={formData.price}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <div>
          <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
          <input
            id='category'
            name='category'
            type='text'
            required
            value={formData.category}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400'
          />
        </div>
        <div className='flex gap-2'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 disabled:opacity-60 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors shadow-md'
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
          <button
            type='button'
            onClick={() => navigate('/admin/products')}
            className='bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-md transition-colors'
          >
            Back to Products
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddNewProductPage
