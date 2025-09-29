import React, { useEffect, useState } from "react";
interface NewCampaignProps {
  isAddMode: boolean;
  isVisible: boolean;
  onClose: () => void;
  setCampaigns: (campaigns: any) => void;
  campaignId: number | null;
}
import { options } from "../global/constants";
function NewCampaign({
  isAddMode,
  isVisible,
  onClose,
  setCampaigns,
  campaignId,
}: Readonly<NewCampaignProps>) {
  const [campaignName, setCampaignName] = useState("");
  const [switchStates, setSwitchStates] = useState(() =>
    options.map((opt) => ({ id: opt.id, enabled: opt.enabled }))
  );
  useEffect(() => {
    if (!isAddMode) {
      const campaigns = JSON.parse(localStorage.getItem("campaigns") || "[]");
      const campaignToEdit = campaigns.find((c) => c.id === campaignId);
      if (campaignToEdit) {
        setCampaignName(campaignToEdit.name);
        setSwitchStates(campaignToEdit.switchStates);
      }
    }
  }, [isAddMode, campaignId]);
  if (!isVisible) return null;

  const handleSwitchChange = (id: number) => {
    setSwitchStates((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, enabled: !opt.enabled } : opt
      )
    );
  };

  const onSubmit = () => {
    const data = {
      name: campaignName,
      switchStates,
      id: Date.now().toLocaleString(),
    };
    setCampaigns(data);
    setCampaignName("");
    setSwitchStates(
      options.map((opt) => ({ id: opt.id, enabled: opt.enabled }))
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {isAddMode ? "New Campaign" : "Edit Campaign"}
        </h2>
        {/* Modal content goes here */}
        <div className="mb-4 text-gray-600">
          <div>
            <label
              htmlFor="campaignName"
              className="block text-sm text-gray-700 mb-2"
            >
              Campaign Name
            </label>
            <input
              type="text"
              id="campaignName"
              className="border border-gray-300 rounded-md p-2 w-full"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />
          </div>
          <div id="options">
            {options.map((option) => {
              const state = switchStates.find((s) => s.id === option.id);
              return (
                <label
                  key={option.id}
                  className="flex items-center space-x-3 mt-4 justify-between"
                >
                  <span className="text-sm text-gray-700">{option.name}</span>
                  <input
                    type="checkbox"
                    checked={!!state?.enabled}
                    onChange={() => handleSwitchChange(option.id)}
                    className="toggle-checkbox hidden"
                  />
                  <span
                    className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out ${
                      state?.enabled ? "bg-lime-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                        state?.enabled ? "translate-x-4" : ""
                      }`}
                    ></span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mt-2"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#5A8A22] text-white px-4 py-2 rounded-md mt-2"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCampaign;
