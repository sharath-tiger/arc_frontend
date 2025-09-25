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

export const fetchNumberOfLoans = createAsyncThunk(
    'filter/fetchLoanCount',
    async (parameters:{selectedProductType:string,selectedState:string,selectedOccupancyType:string,selectedEscrow:string,selectedZipCode:string,selectedPropertyType:string}): Promise<number>=>{
        const params='product_type='+parameters.selectedProductType+'&state='+parameters.selectedState+'&occupancy_type='+parameters.selectedOccupancyType+'&escrow='+parameters.selectedEscrow+'&zip_code='+parameters.selectedZipCode+'&property_type='+parameters.selectedPropertyType
        const response: {data:{data:number}}=await customAxios.get('/loan_count?'+params);
        return response.data.data;
    }
);

interface FilterState {
  state: string[];
  productType: string[];
  propertyType: string[];
  selectedState: string;
  selectedProductType: string;
  selectedPropertyType: string;
  selectedZipCode: string;
  selectedEscrow: string;
  selectedOccupancyType: string;
  numberOfLoans: number;
  loading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  state: [],
  productType: [],
  propertyType: [],
  selectedState: '',
  selectedProductType: '',
  selectedPropertyType: '',
  selectedZipCode: '',
  selectedEscrow: '',
  selectedOccupancyType: '',
  numberOfLoans: 0,
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
    setSelectedState(state,action) {
        state.selectedState=action.payload;
    },
    setSelectedProductType(state,action) {
        state.selectedProductType=action.payload;
    },
    setSelectedPropertyType(state,action){
        state.selectedPropertyType=action.payload;
    },
    setSelectedZipCode(state,action) {
        state.selectedZipCode=action.payload;
    },
    setSelectedEscrow(state,action) {
        state.selectedEscrow=action.payload;
    },
    setSelectedOccupancyType(state,action){
        state.selectedOccupancyType=action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNumberOfLoans.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNumberOfLoans.fulfilled, (state, action: PayloadAction<number>) => {
        state.numberOfLoans = action.payload;
        state.loading = false;
      })
      .addCase(fetchNumberOfLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch states';
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

export const { resetFilter, setSelectedState, setSelectedProductType, setSelectedPropertyType, setSelectedZipCode, setSelectedEscrow, setSelectedOccupancyType } = filterSlice.actions;
export default filterSlice.reducer;


