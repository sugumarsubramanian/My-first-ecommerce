import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../../redux/slices/productSlice'

function ProductsListPage() {
  const dispatch = useDispatch()
  const { items: products, status, error } = useSelector((state) => state.products)
  const isLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchProducts({}))
  }, [dispatch])

  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-bold'>Products</h2>
        <Link
          to='/admin/products/add'
          className='text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 px-3 py-1.5 rounded-md transition-colors'
        >
          Add Product
        </Link>
      </div>
      {isLoading && <p className='text-sm text-gray-500'>Loading...</p>}
      {error && <p className='text-sm text-red-500'>{error}</p>}
      {!isLoading && !error && (
        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left'>
            <thead>
              <tr className='border-b border-gray-200 text-gray-500 text-xs uppercase'>
                <th className='py-2 pr-4'>ID</th>
                <th className='py-2 pr-4'>Title</th>
                <th className='py-2 pr-4'>Category</th>
                <th className='py-2 pr-4'>Price</th>
                <th className='py-2 pr-4'></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className='border-b border-gray-100'>
                  <td className='py-2 pr-4'>{product.id}</td>
                  <td className='py-2 pr-4'>{product.title || product.name}</td>
                  <td className='py-2 pr-4'>{product.category}</td>
                  <td className='py-2 pr-4'>₹{product.price}</td>
                  <td className='py-2 pr-4'>
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className='text-blue-500 hover:text-blue-700 font-medium'
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className='text-sm text-gray-500 mt-4'>No products yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductsListPage
