import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoanForm from "./components/LoanForm";
import ResultsPage from "./components/ResultsPage";
import LoanTablePage from "./components/LoanTablePage";
import LoanDetailsPage from "./components/LoanDetailsPage";
import LoginPage from "./components/LoginPage";
import AdminSettings from "./components/AdminSettings";
import FilterCampaign from "./components/FilterCampaign";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/filter-campaign" element={<FilterCampaign />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/loan-table" element={<LoanTablePage />} />
        <Route path="/loan-details/:loanId" element={<LoanDetailsPage />} />
        <Route path="/" element={<Navigate to="/admin-settings" />} />
      </Routes>
    </Router>
  );
}

export default App;
