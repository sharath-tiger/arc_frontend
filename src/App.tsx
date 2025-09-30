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
import ListCampaigns from "./components/ListCampaigns";
import FilterLoans from "./components/persona/analyst/FilterLoans";
import ViableList from "./components/persona/analyst/ViableList";
import LoanList from "./components/persona/mlo/LoanList";
import WorkBench from "./components/persona/mlo/WorkBench";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loan-form" element={<LoanForm />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/list-campaigns" element={<ListCampaigns />} />
        <Route
          path="/filter-campaign/:campaignId"
          element={<FilterCampaign />}
        />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/loan-table" element={<LoanTablePage />} />
        <Route path="/loan-details/:loanId" element={<LoanDetailsPage />} />
        <Route path="/" element={<Navigate to="/admin-settings" />} />
        <Route path="/filter-loans" element={<FilterLoans />} />
        <Route path="/viable-list" element={<ViableList />} />
        <Route path="/viable-loans" element={<LoanList />} />
        <Route path="/work-bench/:loanId" element={<WorkBench />} />
      </Routes>
    </Router>
  );
}

export default App;
