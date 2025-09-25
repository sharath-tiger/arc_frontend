import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Calendar, Home, Users } from 'lucide-react';
import { LoanFormData } from './LoanForm';

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
  const formData = location.state?.formData as LoanFormData;

  const [resultsForm, setResultsForm] = useState<ResultsFormData>({
    modelledInterestRate: '',
    amountSavedPerMonth: '',
    paybackPeriod: ''
  });

  // If no form data, redirect back to form
  if (!formData) {
    navigate('/');
    return null;
  }

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
    
    // Navigate to loan table page with both form data sets
    navigate('/loan-table', { 
      state: { 
        formData, 
        resultsData: resultsForm 
      } 
    });
  };

  // Check if any of the three main fields has a value to disable others
  const hasModelledRate = resultsForm.modelledInterestRate.trim() !== '';
  const hasSavings = resultsForm.amountSavedPerMonth.trim() !== '';
  const hasPayback = resultsForm.paybackPeriod.trim() !== '';
  const anyFieldHasValue = hasModelledRate || hasSavings || hasPayback;

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Application
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">ARC</h1>
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
          <div className="grid grid-cols-1  mb-8">
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
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <h2 className="text-2xl font-semibold text-white">Mortgage Engine</h2>
              <p className="text-indigo-100 mt-1">Choose any one of the options to filter</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                  <p className="text-xs text-gray-500">Number of months to break even</p>
                </div>

                {/* Escrow */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Refinance - Escrow 
                  </label>
                  <select
                    value={resultsForm.escrow}
                    onChange={handleSelectChange('escrow')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
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
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  View Viable Loans
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;