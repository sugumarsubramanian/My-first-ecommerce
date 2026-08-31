import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart, updateQuantity } from '../../../redux/slices/cartSlice'

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'cod', label: 'Cash on Delivery' },
]

function CartPage() {
  const items = useSelector((state) => state.cart.items)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleQuantityChange = (id, delta, currentQuantity) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + delta }))
  }

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      return
    }
    dispatch(clearCart())
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className='max-w-md mx-auto bg-white rounded-md shadow-md p-6 text-center'>
        <h1 className='text-lg font-bold mb-2'>Order Placed!</h1>
        <p className='text-sm text-gray-500 mb-4'>
          This is a demo checkout — no real payment was processed.
        </p>
        <Link
          to='/products'
          className='inline-block bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors shadow-md'
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className='max-w-md mx-auto bg-white rounded-md shadow-md p-6 text-center'>
        <h1 className='text-lg font-bold mb-2'>Your cart is empty</h1>
        <Link
          to='/products'
          className='inline-block mt-2 bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors shadow-md'
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto flex flex-col md:flex-row gap-6'>
      <div className='flex-1 space-y-4'>
        <h1 className='text-lg font-bold'>Your Cart</h1>
        {items.map((item) => (
          <div key={item.id} className='bg-white rounded-md shadow-md p-4 flex items-center gap-4'>
            {item.thumbnail ? (
              <img src={item.thumbnail} alt={item.name} className='w-16 h-16 object-cover rounded-md' />
            ) : (
              <div className='w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-gray-400'>
                No Image
              </div>
            )}
            <div className='flex-1'>
              <p className='font-semibold text-gray-800'>{item.name}</p>
              <p className='text-sm text-blue-600'>₹{item.price}</p>
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={() => handleQuantityChange(item.id, -1, item.quantity)}
                disabled={item.quantity <= 1}
                className='w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium'
              >
                −
              </button>
              <span className='text-sm w-6 text-center'>{item.quantity}</span>
              <button
                type='button'
                onClick={() => handleQuantityChange(item.id, 1, item.quantity)}
                className='w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium'
              >
                +
              </button>
            </div>
            <p className='w-20 text-right text-sm font-medium text-gray-700'>
              ₹{(item.price * item.quantity).toFixed(2)}
            </p>
            <button
              type='button'
              onClick={() => dispatch(removeFromCart(item.id))}
              className='text-xs font-medium text-red-500 hover:text-red-700'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className='w-full md:w-72 shrink-0 space-y-4'>
        <div className='bg-white rounded-md shadow-md p-4'>
          <h2 className='text-sm font-semibold text-gray-500 uppercase mb-3'>Total</h2>
          <div className='flex items-center justify-between text-sm text-gray-600 mb-1'>
            <span>Items</span>
            <span>{items.reduce((count, item) => count + item.quantity, 0)}</span>
          </div>
          <div className='flex items-center justify-between text-base font-bold text-gray-800 mt-2 pt-2 border-t border-gray-100'>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className='bg-white rounded-md shadow-md p-4'>
          <h2 className='text-sm font-semibold text-gray-500 uppercase mb-3'>Payment</h2>
          <div className='space-y-2 mb-4'>
            {paymentMethods.map((method) => (
              <label key={method.id} className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={() => setPaymentMethod(method.id)}
                />
                {method.label}
              </label>
            ))}
          </div>
          {isAuthenticated ? (
            <button
              type='button'
              onClick={handlePlaceOrder}
              className='w-full bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white text-sm font-medium py-2 rounded-md transition-colors shadow-md'
            >
              Place Order
            </button>
          ) : (
            <>
              <p className='text-xs text-gray-500 mb-2 text-center'>Log in to place your order.</p>
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='w-full bg-blue-400 bg-gradient-to-tr hover:bg-blue-500 text-white text-sm font-medium py-2 rounded-md transition-colors shadow-md'
              >
                Login to Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartPage
