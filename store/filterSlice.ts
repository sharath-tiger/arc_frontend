import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import customAxios from '../customAxios';

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

interface FilterState {
  state: string[];
  productType: string[];
  propertyType: string[];
  loading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  state: [],
  productType: [],
  propertyType: [],
  loading: false,
  error: null,
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


