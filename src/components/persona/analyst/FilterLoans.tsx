import React from "react";
import { useNavigate } from "react-router-dom";

function FilterLoans() {
  const navigate = useNavigate();
  const submitHandler = () => {
    navigate("/dashboard/viable-list");
  };
  return (
    <div>
      <div className="bg-white rounded-md p-2 shadow-md w-1/2">
        <div className="py-2 border-b">
          <h2 className="text-3xl">Filter Loans</h2>
        </div>

        <div className="p-2">
          <div className="flex flex-col space-y-2 mb-5">
            <label htmlFor="interest-rate" className="text-gray-500">
              Enter the Revised Interest Rate (bps) *
            </label>
            <input
              type="text"
              id="interest-rate"
              className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-lime-600"
            />
          </div>
          <div className="flex flex-col space-y-2 mb-5">
            <label htmlFor="interest-rate" className="text-gray-500">
              Enter the Revised Interest Rate (bps) *
            </label>
            <input
              type="text"
              id="interest-rate"
              className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-lime-600"
            />
          </div>
          <div className="flex flex-col space-y-2 mb-5">
            <label htmlFor="interest-rate" className="text-gray-500">
              Enter the Revised Interest Rate (bps) *
            </label>
            <input
              type="text"
              id="interest-rate"
              className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-lime-600"
            />
          </div>
          <div>
            <button
              className="bg-lime-700 text-white p-3 rounded-md"
              onClick={submitHandler}
            >
              View Viable Loans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterLoans;
