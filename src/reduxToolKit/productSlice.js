import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { mockProducts } from '../utils/mockData';
const url = "https://ecommerce-backend-mrre.onrender.com/api/product/";
export const getProductFromApi = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
    });
    console.log("Products fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);

    if (error.code === 'ECONNABORTED') {
      return rejectWithValue('Request timeout - please check your connection');
    }

    if (error.response) {
      // Server responded with error status
      return rejectWithValue(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received - use mock data as fallback
      console.warn('API not available, using mock data');
      return mockProducts;
    } else {
      // Something else happened
      return rejectWithValue(error.message || 'Unknown error occurred');
    }
  }
})

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductFromApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductFromApi.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Only update products if we actually received data
        if (action.payload && Array.isArray(action.payload)) {
          state.products = action.payload;
          state.lastFetched = Date.now();
        }
      })
      .addCase(getProductFromApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
        // Don't clear existing products on error - keep them for better UX
      });
  },
});

// Export actions
export const { clearError } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
