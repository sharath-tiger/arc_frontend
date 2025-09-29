import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, DollarSign, Calendar, Shield, TrendingUp } from 'lucide-react';

interface LoanDetail {
  loanId: string;
  productType: string;
  originationDate: string;
  loanTerm: number;
  investor: string;
  customerId: string;
  interestRate: number;
  originalPropertyValue: number;
  currentEstimatedPropertyValue: number;
  originalLoanBalance: number;
  originalLoanToValue: number;
  paymentPI: number;
  mortgageInsurance: number;
  currentLoanToValue: number;
  currentLoanBalance: number;
  calculatedLoanToValue: number;
}

interface LoanOption {
  loanType: string;
  closingCost: number;
  savingsPerMonth: number;
  paybackPeriod: number;
  insurance: number;
}

// Mock function to get loan details by ID
const getLoanById = (loanId: string): LoanDetail | null => {
  // This would typically come from an API or database
  const mockLoan: LoanDetail = {
    loanId,
    productType: 'C30',
    originationDate: '03/15/2022',
    loanTerm: 30,
    investor: 'Fannie Mae',
    customerId: `CU${loanId.slice(-5)}`,
    interestRate: 3.75,
    originalPropertyValue: 485000,
    currentEstimatedPropertyValue: 520000,
    originalLoanBalance: 388000,
    originalLoanToValue: 80.0,
    paymentPI: 1795,
    mortgageInsurance: 285,
    currentLoanToValue: 74.6,
    currentLoanBalance: 365000,
    calculatedLoanToValue: 70.2
  };
  
  return mockLoan;
};

// Mock loan options data
const getLoanOptions = (): LoanOption[] => {
  return [
    {
      loanType: 'Conventional 30-Year Fixed',
      closingCost: 3500,
      savingsPerMonth: 245,
      paybackPeriod: 14,
      insurance: 285
    },
    {
      loanType: 'Conventional 15-Year Fixed',
      closingCost: 3200,
      savingsPerMonth: 180,
      paybackPeriod: 18,
      insurance: 0
    },
    {
      loanType: 'FHA 30-Year Fixed',
      closingCost: 2800,
      savingsPerMonth: 320,
      paybackPeriod: 9,
      insurance: 425
    },
    {
      loanType: 'VA 30-Year Fixed',
      closingCost: 2500,
      savingsPerMonth: 380,
      paybackPeriod: 7,
      insurance: 0
    },
    {
      loanType: 'Jumbo 30-Year Fixed',
      closingCost: 4200,
      savingsPerMonth: 195,
      paybackPeriod: 22,
      insurance: 0
    }
  ];
};

function LoanDetailsPage() {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();
  
  const loanDetail = loanId ? getLoanById(loanId) : null;
  const loanOptions = getLoanOptions();

  if (!loanDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loan Not Found</h1>
          <button
            onClick={() => navigate('/loan-table')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Back to Loan Table
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-green-600 hover:text-green-700 transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Loan Table
            </button>
            <div className="flex items-center">
              <img 
                src="https://www.regions.com/rdcresources/content/media/img/regions-logo-no-r.svg" 
                alt="Regions Bank" 
                className="h-8 mr-4" // Increased size for better visibility
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Loan Details</h1>
                <p className="text-lg text-gray-600 mt-1">
                  Comprehensive information for Loan ID: {loanDetail.loanId}
                </p>
              </div>
            </div>
          </div>

          {/* Loan Details Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
              <h2 className="text-2xl font-semibold text-white">Loan Information</h2>
              <p className="text-green-100 mt-1">Current loan details and metrics</p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-green-600" />
                      Basic Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan ID:</span>
                        <span className="font-medium text-gray-900">{loanDetail.loanId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer ID:</span>
                        <span className="font-medium text-gray-900">{loanDetail.customerId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product Type:</span>
                        <span className="font-medium text-gray-900">{loanDetail.productType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Origination Date:</span>
                        <span className="font-medium text-gray-900">{loanDetail.originationDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Term:</span>
                        <span className="font-medium text-gray-900">{loanDetail.loanTerm} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investor:</span>
                        <span className="font-medium text-gray-900">{loanDetail.investor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                      Financial Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-medium text-gray-900">{loanDetail.interestRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment (P&I):</span>
                        <span className="font-medium text-gray-900">{formatCurrency(loanDetail.paymentPI)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mortgage Insurance:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(loanDetail.mortgageInsurance)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Property Values
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original Property Value:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(loanDetail.originalPropertyValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Property Value:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(loanDetail.currentEstimatedPropertyValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Value Change:</span>
                        <span className="font-medium text-green-600">
                          +{formatCurrency(loanDetail.currentEstimatedPropertyValue - loanDetail.originalPropertyValue)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Loan Balances & LTV
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original Loan Balance:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(loanDetail.originalLoanBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Loan Balance:</span>
                        <span className="font-medium text-gray-900">{formatCurrency(loanDetail.currentLoanBalance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Original LTV:</span>
                        <span className="font-medium text-gray-900">{formatPercentage(loanDetail.originalLoanToValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current LTV:</span>
                        <span className="font-medium text-gray-900">{formatPercentage(loanDetail.currentLoanToValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calculated LTV:</span>
                        <span className="font-medium text-gray-900">{formatPercentage(loanDetail.calculatedLoanToValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Options Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6">
              <h2 className="text-2xl font-semibold text-white">Available Loan Options</h2>
              <p className="text-green-100 mt-1">Compare different loan products and their benefits</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Closing Cost
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Savings Per Month
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payback Period
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Insurance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loanOptions.map((option, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{option.loanType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(option.closingCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        {formatCurrency(option.savingsPerMonth)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {option.paybackPeriod} months
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {option.insurance > 0 ? formatCurrency(option.insurance) : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4">
              <p className="text-sm text-gray-600">
                * Savings and costs are estimates based on current market conditions and loan parameters.
                Actual values may vary based on final loan terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanDetailsPage;

