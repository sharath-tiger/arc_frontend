import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { LoanFormData } from './LoanForm';

interface LoanRecord {
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

// Generate 100 mock loan records
const generateMockData = (): LoanRecord[] => {
  const investors = ['Fannie Mae', 'Freddie Mac', 'Wells Fargo', 'Chase', 'Bank of America', 'Quicken Loans'];
  const productTypes = ['C30', 'C20', 'FHA', 'VA', 'Jumbo'];
  
  return Array.from({ length: 100 }, (_, index) => {
    const loanId = `LN${(index + 1).toString().padStart(6, '0')}`;
    const customerId = `CU${(index + 1).toString().padStart(5, '0')}`;
    const originalPropertyValue = Math.floor(Math.random() * 500000) + 200000;
    const originalLoanBalance = Math.floor(originalPropertyValue * (0.7 + Math.random() * 0.2));
    const currentLoanBalance = Math.floor(originalLoanBalance * (0.6 + Math.random() * 0.3));
    const currentEstimatedPropertyValue = Math.floor(originalPropertyValue * (0.9 + Math.random() * 0.3));
    
    return {
      loanId,
      productType: productTypes[Math.floor(Math.random() * productTypes.length)],
      originationDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString(),
      loanTerm: Math.random() > 0.7 ? 15 : 30,
      investor: investors[Math.floor(Math.random() * investors.length)],
      customerId,
      interestRate: parseFloat((2.5 + Math.random() * 4).toFixed(3)),
      originalPropertyValue,
      currentEstimatedPropertyValue,
      originalLoanBalance,
      originalLoanToValue: parseFloat(((originalLoanBalance / originalPropertyValue) * 100).toFixed(2)),
      paymentPI: Math.floor(originalLoanBalance * 0.005 + Math.random() * 1000),
      mortgageInsurance: Math.floor(Math.random() * 300) + 50,
      currentLoanToValue: parseFloat(((currentLoanBalance / currentEstimatedPropertyValue) * 100).toFixed(2)),
      currentLoanBalance,
      calculatedLoanToValue: parseFloat(((currentLoanBalance / currentEstimatedPropertyValue) * 100).toFixed(2))
    };
  });
};

function LoanTablePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData as LoanFormData;
  const resultsData = location.state?.resultsData;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchCustomerId, setSearchCustomerId] = useState('');
  const [searchLoanId, setSearchLoanId] = useState('');
  const recordsPerPage = 20;

  const mockData = useMemo(() => generateMockData(), []);

  // Filter data based on search inputs
  const filteredData = useMemo(() => {
    return mockData.filter(record => {
      const customerIdMatch = searchCustomerId === '' || 
        record.customerId.toLowerCase().includes(searchCustomerId.toLowerCase());
      const loanIdMatch = searchLoanId === '' || 
        record.loanId.toLowerCase().includes(searchLoanId.toLowerCase());
      return customerIdMatch && loanIdMatch;
    });
  }, [mockData, searchCustomerId, searchLoanId]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchCustomerId, searchLoanId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
              onClick={() => navigate('/results', { state: { formData } })}
              className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200 mr-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Results
            </button>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">ARC</h1>
              <p className="text-lg text-gray-600 mt-1">
                 Automatic Refinance calculator
              </p>
            </div>
          </div>

          {/* Search Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Search & Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by Customer ID"
                  value={searchCustomerId}
                  onChange={(e) => setSearchCustomerId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by Loan ID"
                  value={searchLoanId}
                  onChange={(e) => setSearchLoanId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredData.length} of {mockData.length} records
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <h2 className="text-2xl font-semibold text-white">Viable Mortgage Loans</h2>
              <p className="text-indigo-100 mt-1">Page {currentPage} of {totalPages}</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origination Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Term</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Property Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Property Value</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Loan Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original LTV</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment (P&I)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mortgage Insurance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current LTV</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Loan Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calculated LTV</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords.map((record, index) => (
                    <tr key={record.loanId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          to={`/loan-details/${record.loanId}`}
                          className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
                        >
                          {record.loanId}
                        </Link>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.productType}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.originationDate}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.loanTerm} years</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.investor}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{record.customerId}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{record.interestRate}%</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(record.originalPropertyValue)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(record.currentEstimatedPropertyValue)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(record.originalLoanBalance)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercentage(record.originalLoanToValue)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(record.paymentPI)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(record.mortgageInsurance)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercentage(record.currentLoanToValue)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(record.currentLoanBalance)}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercentage(record.calculatedLoanToValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> of{' '}
                    <span className="font-medium">{filteredData.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === pageNum
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanTablePage;