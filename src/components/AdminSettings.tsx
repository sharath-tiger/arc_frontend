import React, { useState } from "react";

function AdminSettings() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Campaigns</h2>
        <button
          className="bg-[#5A8A22] text-white px-4 py-2 rounded-md"
          onClick={() => setShowModal(true)}
        >
          Create New Campaign
        </button>
      </div>
      <div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Campaign List</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Campaign Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">End Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Spring Sale</td>
                <td className="px-4 py-2">Active</td>
                <td className="px-4 py-2">2024-03-01</td>
                <td className="px-4 py-2">2024-05-31</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-4">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Create New Campaign</h2>
            {/* Modal content goes here */}
            <div className="mb-4 text-gray-600" id="form-section">
              {/* Add form fields for campaign creation here */}
            </div>
            <button
              className="bg-[#5A8A22] text-white px-4 py-2 rounded-md mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
