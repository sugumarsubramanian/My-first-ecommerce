import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = process.env.REACT_APP_BKEND_URL

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, limit, category } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (page) params.set('page', page)
      if (limit) params.set('limit', limit)
      if (category) params.set('category', category)
      const query = params.toString()
      console.log(query);
      const response = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`)
      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to fetch products')
      }
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/products/categories`)
      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to fetch categories')
      }
      return data.categories || []
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`)
      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to load product')
      }
      return data.product
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.authToken}`,
        },
        body: JSON.stringify(productData),
      })
      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to add product')
      }
      return data.product
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, updates }, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().auth.authToken}`,
        },
        body: JSON.stringify(updates),
      })
      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.error || 'Failed to update product')
      }
      return data.product
    } catch (error) {
      return rejectWithValue(error.message || 'Network error')
    }
  }
)

const initialState = {
  items: [],
  categories: [],
  pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
  currentProduct: null,
  status: 'idle',
  error: null,
  categoriesStatus: 'idle',
  categoriesError: null,
  productStatus: 'idle',
  productError: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null
      state.productStatus = 'idle'
      state.productError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.products || []
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to fetch products'
      })

      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading'
        state.categoriesError = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesStatus = 'succeeded'
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesStatus = 'failed'
        state.categoriesError = action.payload || 'Failed to fetch categories'
      })

      .addCase(fetchProductById.pending, (state) => {
        state.productStatus = 'loading'
        state.productError = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productStatus = 'succeeded'
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productStatus = 'failed'
        state.productError = action.payload || 'Failed to load product'
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
  },
})

export const { clearCurrentProduct } = productSlice.actions
export default productSlice.reducer
