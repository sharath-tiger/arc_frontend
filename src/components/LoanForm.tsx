import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

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
  const [formData, setFormData] = useState<LoanFormData>({
    productType: '',
    state: '',
    propertyType: '',
    zipCode: ''
  });

  const handleSelectChange = (field: keyof LoanFormData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleInputChange = (field: keyof LoanFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = Object.entries(formData);
    const hasEmptyFields = requiredFields.some(([_, value]) => !value.trim());
    
    if (hasEmptyFields) {
      alert('Please fill in all required fields');
      return;
    }

    // Navigate to results page with form data
    navigate('/results', { state: { formData } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Building2 className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">ARC </h1>
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
                {/* Product Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Product Type *
                  </label>
                  <select
                    value={formData.productType}
                    onChange={handleSelectChange('productType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Product Type</option>
                    <option value="c30">C30</option>
                    <option value="c20">C20</option>
                    <option value="p20">P20</option>
                    <option value="balloon">Balloon</option>
                    <option value="c5/6arm">C 5/6 ARM</option>
                    
                  </select>
                </div>

                {/* State */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={handleSelectChange('state')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select State</option>
                    {US_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={handleSelectChange('propertyType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Property Type</option>
                    <option value="condo">Condo</option>
                    <option value="single family">Single Family</option>
                  </select>
                </div>
                {/* Zip Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Zip Code *
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={handleInputChange('zipCode')}
                    placeholder="Enter Zip Code"
                    maxLength={10}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                  />
                </div>

                {/* Escrow */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Escrow 
                  </label>
                  <select
                    value={formData.escrow}
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
                  <label className="block text-sm font-semibold text-gray-700">
                    Occupancy Type 
                  </label>
                  <select
                    value={formData.occupancyType}
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

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Fields marked with * are required. Your information is secure and protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanForm;