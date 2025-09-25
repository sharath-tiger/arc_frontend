import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

// 1. Import hooks and actions
import { useDispatch, useSelector } from 'react-redux';
import { fetchNumberOfLoans, fetchStates, fetchProductTypes, fetchPropertyTypes, setSelectedState, setSelectedProductType, setSelectedPropertyType, setSelectedZipCode, setSelectedEscrow, setSelectedOccupancyType } from '../../store/filterSlice';
import { AppDispatch, RootState } from '../../store/store'; // Adjust path to your store file

// The hardcoded US_STATES array is no longer needed
// const US_STATES = [ ... ];

export interface LoanFormData {
  productType: string;
  state: string;
  propertyType: string;
  escrow: string;
  occupancyType: string;
  zipCode: string;
}

function LoanForm() {
  const navigate = useNavigate();
  
  // 2. Initialize dispatch and select data from the store
  const dispatch = useDispatch<AppDispatch>();
  const { 
    state: fetchedStates, // Renamed to avoid conflict with formData.state
    productType: productTypes,
    propertyType: propertyTypes,
    selectedState,
    selectedProductType,
    selectedPropertyType,
    selectedZipCode,
    selectedEscrow,
    selectedOccupancyType,
    loading, 
    error 
  } = useSelector((state: RootState) => state.filter);

  const [formData, setFormData] = useState<LoanFormData>({
    productType: '',
    state: '',
    propertyType: '',
    zipCode: '',
    escrow: '',
    occupancyType: ''
  });

  // 3. Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchStates());
    dispatch(fetchProductTypes());
    dispatch(fetchPropertyTypes());
  }, [dispatch]);

  const handleSelectChange = (field: keyof LoanFormData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(field==='productType'){
      dispatch(setSelectedProductType(e.target.value));
    }
    else if(field==='state'){
      dispatch(setSelectedState(e.target.value));
    }
    else if(field==='propertyType'){
      dispatch(setSelectedPropertyType(e.target.value));
    }
    else if(field==='escrow'){
      dispatch(setSelectedEscrow(e.target.value));
    }
    else if(field==='occupancyType'){
      dispatch(setSelectedOccupancyType(e.target.value));
    }    
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleInputChange = (field: keyof LoanFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSelectedZipCode(e.target.value));
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = ['productType', 'state', 'propertyType', 'zipCode'];

    const parameters={
    selectedState,
    selectedProductType,
    selectedPropertyType,
    selectedZipCode,
    selectedEscrow,
    selectedOccupancyType,
    }
    dispatch(fetchNumberOfLoans(parameters));
    
    let hasEmptyFields=false;
    if(selectedState==''||selectedPropertyType==''||selectedProductType==''||selectedZipCode==''||selectedEscrow==''||selectedOccupancyType==''){
      hasEmptyFields=true;
    }
    if (hasEmptyFields) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    navigate('/results', { state: { formData } });
  };

  // Optional: Handle loading and error states for better UX
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading filter options...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <img 
                src="https://www.regions.com/rdcresources/content/media/img/regions-logo-no-r.svg" 
                alt="Regions Bank" 
                className="h-12 mr-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden items-center" style={{display: 'none'}}>
                <Building2 className="w-12 h-12 text-green-600 mr-3" />
                <h1 className="text-4xl font-bold text-gray-900">Regions Bank</h1>
              </div>
              <h1 className="text-4xl font-bold text-gray-900"></h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
             ARC - Automatic refinancing calculator helps identify all viable loans across geographic locations in the Country.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <h2 className="text-2xl font-semibold text-white">View Eligible Mortgage Loans </h2>
              <p className="text-green-100 mt-1">Please fill in all required information</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Product Type - Now using data from Redux */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Product Type *</label>
                  <select
                    value={selectedProductType}
                    onChange={handleSelectChange('productType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Product Type</option>
                    {productTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* State - Now using data from Redux */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">State *</label>
                  <select
                    value={selectedState}
                    onChange={handleSelectChange('state')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select State</option>
                    {fetchedStates.map(stateName => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type - Now using data from Redux */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Property Type *</label>
                  <select
                    value={selectedPropertyType}
                    onChange={handleSelectChange('propertyType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Property Type</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Zip Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Zip Code *</label>
                  <input
                    type="text"
                    value={selectedZipCode}
                    onChange={handleInputChange('zipCode')}
                    placeholder="Enter Zip Code"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>

                {/* Escrow */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Escrow</label>
                  <select
                    value={selectedEscrow}
                    onChange={handleSelectChange('escrow')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Escrow</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Occupancy Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Occupancy Type</label>
                  <select
                    value={selectedOccupancyType}
                    onChange={handleSelectChange('occupancyType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Occupancy Type</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanForm;