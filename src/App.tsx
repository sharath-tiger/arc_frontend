import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoanForm from './components/LoanForm';
import ResultsPage from './components/ResultsPage';
import LoanTablePage from './components/LoanTablePage';
import LoanDetailsPage from './components/LoanDetailsPage';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/loan-table" element={<LoanTablePage />} />
        <Route path="/loan-details/:loanId" element={<LoanDetailsPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;