import React from "react";
import { useNavigate } from "react-router-dom";

function LoanList() {
  const navigate = useNavigate();
  const goToLoan = (loanId: string) => {
    navigate(`/dashboard/work-bench/${loanId}`);
  };
  return (
    <div>
      Should Show List of viable loans{" "}
      <button
        className="text-lime-700 font-bold"
        onClick={() => goToLoan("ln001")}
      >
        Eg. LN001
      </button>
    </div>
  );
}

export default LoanList;
