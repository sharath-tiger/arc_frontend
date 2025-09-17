import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoanForm from './components/LoanForm';
import ResultsPage from './components/ResultsPage';
import LoanTablePage from './components/LoanTablePage';
import LoanDetailsPage from './components/LoanDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoanForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/loan-table" element={<LoanTablePage />} />
        <Route path="/loan-details/:loanId" element={<LoanDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;