import React from 'react'
import { useSelector } from 'react-redux'

const dummyOrders = [
  { id: 'ORD-1001', product: 'Wireless Mouse', customer: 'Aditi Rao', quantity: 2, price: 799, status: 'Pending', date: '2026-08-25' },
  { id: 'ORD-1002', product: 'Mechanical Keyboard', customer: 'Rahul Mehta', quantity: 1, price: 3499, status: 'Shipped', date: '2026-08-26' },
  { id: 'ORD-1003', product: 'USB-C Hub', customer: 'Priya Nair', quantity: 3, price: 1299, status: 'Delivered', date: '2026-08-27' },
  { id: 'ORD-1004', product: 'Laptop Stand', customer: 'Karan Shah', quantity: 1, price: 1899, status: 'Cancelled', date: '2026-08-28' },
  { id: 'ORD-1005', product: 'Webcam 1080p', customer: 'Sneha Iyer', quantity: 1, price: 2199, status: 'Pending', date: '2026-08-29' },
]

const statusClasses = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
}

function OrdersPage() {
  const user = useSelector((state) => state.auth.user)
  const isAdmin = user?.role === 'admin'

  return (
    <div>
      <h2 className='text-lg font-bold mb-4'>{isAdmin ? 'Orders' : 'Order History'}</h2>
      <p className='text-xs text-gray-400 mb-4'>Showing sample data — not yet connected to a backend.</p>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead>
            <tr className='border-b border-gray-200 text-gray-500 text-xs uppercase'>
              <th className='py-2 pr-4'>Order ID</th>
              <th className='py-2 pr-4'>Product</th>
              <th className='py-2 pr-4'>Customer</th>
              <th className='py-2 pr-4'>Qty</th>
              <th className='py-2 pr-4'>Price</th>
              <th className='py-2 pr-4'>Date</th>
              <th className='py-2 pr-4'>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id} className='border-b border-gray-100'>
                <td className='py-2 pr-4 font-medium text-gray-700'>{order.id}</td>
                <td className='py-2 pr-4'>{order.product}</td>
                <td className='py-2 pr-4'>{order.customer}</td>
                <td className='py-2 pr-4'>{order.quantity}</td>
                <td className='py-2 pr-4'>₹{order.price}</td>
                <td className='py-2 pr-4'>{order.date}</td>
                <td className='py-2 pr-4'>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrdersPage
