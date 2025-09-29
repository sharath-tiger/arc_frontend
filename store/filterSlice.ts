import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import customAxios from '../customAxios';

interface User {
  username: string;
  password: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const fetchStates = createAsyncThunk(
  'filter/fetchStates',
  async () => {
    const response: {data: {data:string[]}} = await customAxios.get('/filters/state');
    return response.data?.data;
  }
);

export const fetchProductTypes = createAsyncThunk(
  'filter/fetchProductTypes',
  async () => {
    const response: {data: {data:string[]}} = await customAxios.get('/filters/product_type');
    return response.data.data;
  }
);

export const fetchPropertyTypes = createAsyncThunk(
  'filter/fetchPropertyTypes',
  async () => {
    const response: {data: {data:string[]}} = await customAxios.get('/filters/property_type');
    return response.data.data;
  }
);

export const loginUser = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string } // Explicitly type the value for rejected actions
>(
  'login/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await customAxios.post('/login', { username, password });
      // The 'as User' cast is kept for now, but validating the response shape would be even safer.
      return response.data as User;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      // Use optional chaining to safely access the nested message property
      if (apiError.response?.data?.message) {
        return rejectWithValue(apiError.response.data.message);
      }
      return rejectWithValue('An unknown error occurred during login.');
    }
  }
);

export interface FilterState {
  state: string[];
  productType: string[];
  propertyType: string[];
  loading: boolean;
  error: string | null;
  loginLoading?: boolean;
  loginError?: string | null;
  user?: User | null;
}

const initialState: FilterState = {
  state: [],
  productType: [],
  propertyType: [],
  loading: false,
  error: null,
  loginLoading: false,
  loginError: null,
  user: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    resetFilter(state) {
      state.state = [];
      state.productType = [];
      state.propertyType = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
    .addCase(loginUser.pending, state => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message || 'Failed to login';
      })
      .addCase(fetchStates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.state = action.payload;
        state.loading = false;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch states';
      })
      .addCase(fetchProductTypes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.productType = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product types';
      })
      .addCase(fetchPropertyTypes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyTypes.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.propertyType = action.payload;
        state.loading = false;
      })
      .addCase(fetchPropertyTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch property types';
      });
  },
});

export const { resetFilter } = filterSlice.actions;
export default filterSlice.reducer;


