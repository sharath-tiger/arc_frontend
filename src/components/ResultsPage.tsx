import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users } from 'lucide-react';

// Assuming LoanFormData is defined in another file, e.g., './LoanForm'
// For this component to be self-contained, let's define it here.
export interface LoanFormData {
  productType: string;
  propertyType: string;
  state: string;
  zipCode: string;
}

interface ResultsFormData {
  modelledInterestRate: string;
  amountSavedPerMonth: string;
  paybackPeriod: string;
  escrow: string;
  occupancyType: string;
}

function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Provide a default state to avoid issues if location.state is null
  const formData = location.state?.formData as LoanFormData || null;

  const [resultsForm, setResultsForm] = useState<ResultsFormData>({
    modelledInterestRate: '',
    amountSavedPerMonth: '',
    paybackPeriod: '',
    escrow: '',
    occupancyType: ''
  });

  // Handle cases where the user navigates directly to this page
  useEffect(() => {
    if (!formData) {
      navigate('/loan-form');
    }
  }, [formData, navigate]);
  
  // Conditional rendering until formData is confirmed or redirect happens
  if (!formData) {
    return null; // or a loading spinner
  }

  const hasModelledRate = resultsForm.modelledInterestRate.trim() !== '';
  const hasSavings = resultsForm.amountSavedPerMonth.trim() !== '';
  const hasPayback = resultsForm.paybackPeriod.trim() !== '';
  const anyFieldHasValue = hasModelledRate || hasSavings || hasPayback;


  const handleInputChange = (field: keyof ResultsFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setResultsForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSelectChange = (field: keyof ResultsFormData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResultsForm(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mandatory fields
    
    // Navigate to loan table page with both form data sets
    navigate('/loan-table', { 
      state: { 
        formData, 
        resultsData: resultsForm 
      } 
    });
  };

  // Mock KPI data based on form inputs
  const kpiData = [
    {
      title: 'Number of Mortgage Loans',
      value: '5000',
      change: '-0.25%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="relative flex justify-center items-center mb-8">
            <button
              onClick={() => navigate('/loan-form')}
              className="absolute left-0 flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Application
            </button>
            <div className="flex flex-col items-center">
              <img 
                src="https://www.regions.com/rdcresources/content/media/img/regions-logo-no-r.svg" 
                alt="Regions Bank" 
                className="h-12"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="hidden items-center" style={{display: 'none'}}>
                {/* Fallback content can go here */}
              </div>
              <p className="text-lg text-gray-600 mt-1">
                Automatic Refinance calculator
              </p>
            </div>
          </div>

          {/* Application Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Product Type:</span>
                <p className="font-medium text-gray-900 capitalize">{formData.productType}</p>
              </div>
              <div>
                <span className="text-gray-500">Property Type:</span>
                <p className="font-medium text-gray-900 capitalize">{formData.propertyType}</p>
              </div>
              <div>
                <span className="text-gray-500">State:</span>
                <p className="font-medium text-gray-900">{formData.state}</p>
              </div>
              <div>
                <span className="text-gray-500">Zip Code:</span>
                <p className="font-medium text-gray-900">{formData.zipCode}</p>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 mb-8">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Results Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <h2 className="text-2xl font-semibold text-white">Mortgage Engine</h2>
              <p className="text-green-100 mt-1">Choose any one of the options to filter</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Modelled Interest Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Revised Interest Rate (bps) *
                  </label>
                  <input
                    type="number"
                    value={resultsForm.modelledInterestRate}
                    onChange={handleInputChange('modelledInterestRate')}
                    placeholder="e.g., 375"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Enter rate in basis points (100 bps = 1%)</p>
                </div>

                {/* Amount Saved Per Month */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Minimum Monthly Savings *
                  </label>
                  <input
                    type="number"
                    value={resultsForm.amountSavedPerMonth}
                    onChange={handleInputChange('amountSavedPerMonth')}
                    placeholder="e.g., 250"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Enter amount in dollars</p>
                </div>

                {/* Payback Period */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Maximum Payback Period (No. of Months) *
                  </label>
                  <input
                    type="number"
                    value={resultsForm.paybackPeriod}
                    onChange={handleInputChange('paybackPeriod')}
                    placeholder="e.g., 36"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 disabled:bg-gray-100"
                  />
                  <p className="text-xs text-gray-500">Number of months to break even</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Escrow */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Refinance - Escrow 
                  </label>
                  <select
                    value={resultsForm.escrow}
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
                    Refinance - Occupancy Type 
                  </label>
                  <select
                    value={resultsForm.occupancyType}
                    onChange={handleSelectChange('occupancyType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 bg-white"
                  >
                    <option value="">Select Occupancy Type</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 focus:ring-4 focus:ring-green-200 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  View Viable Loans
                </button>
              </div>
            </form>

            {/* Additional Info */}
            <div className="p-8 pt-0 text-center">
              <p className="text-sm text-gray-500">
                Fields marked with * are mandatory. Complete at least one to proceed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
