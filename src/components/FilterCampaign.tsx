import React, { useEffect } from "react";
import { options } from "../global/constants";
import RoleSwitch from "./RoleSwitch";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";

interface MandatoryFilters {
  revisedInterestRate: string;
  minimumMonthlySavings: string;
  maximumPaybackPeriod: string;
}

const RenderField = ({
  enabled,
  id,
  value,
  setValue,
}: {
  enabled: boolean;
  id: number;
  value: any;
  setValue: (val: any) => void;
}) => {
  if (enabled) {
    const field = options.find((opt) => opt.id === id);
    if (field) {
      if (field.type === "select") {
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.name}
            </label>
            <select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="border mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {field.option?.map((opt) => (
                <option key={opt} value={opt} className="">
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );
      } else if (field.type === "input") {
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.name}
            </label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        );
      }
    }
  }

  return null;
};

function FilterCampaign() {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaigns, setCampaigns] = React.useState<{
    name: string;
    id: string;
    switchStates: Array<any>;
  }>({ name: "", id: "", switchStates: [] });

  const [campaignData, setCampaignData] = React.useState<any>(null);
  const [mandatoryFilters, setMandatoryFilters] = React.useState<MandatoryFilters>({
    revisedInterestRate: '',
    minimumMonthlySavings: '',
    maximumPaybackPeriod: ''
  });

  useEffect(() => {
    const storedCampaigns = localStorage.getItem("campaigns");
    if (storedCampaigns) {
      const parsedCampaigns = JSON.parse(storedCampaigns);
      if (Array.isArray(parsedCampaigns)) {
        if (parsedCampaigns.length > 0) {
          console.log("Campaigns available");
          // get the last campaign
          const lastCampaign = parsedCampaigns.find(
            (camp: any) => camp.id.toString() === campaignId
          );
          // const lastCampaign = parsedCampaigns[parsedCampaigns.length - 1];
          console.log("Last Campaign:", lastCampaign);
          setCampaigns(lastCampaign);
        }
      }
    }
  }, []);

  const handleMandatoryChange = (field: keyof MandatoryFilters) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setMandatoryFilters(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const submit = () => {
    // Validate mandatory fields
    if (!mandatoryFilters.revisedInterestRate.trim() || 
        !mandatoryFilters.minimumMonthlySavings.trim() || 
        !mandatoryFilters.maximumPaybackPeriod.trim()) {
      alert('Please fill in all mandatory fields: Revised Interest Rate, Minimum Monthly Savings, and Maximum Payback Period');
      return;
    }
    
    console.log("Campaign Data Submitted:", campaignData);
    console.log("Mandatory Filters:", mandatoryFilters);
    navigate("/loan-table");
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <TopBar role="ANALYST" title="Filter Mortgages" />
        {campaigns?.id ? (
          <div className="p-4 border rounded-md mt-4 bg-white shadow-md">
            <h2 className="mb-6 text-lg font-semibold">{campaigns.name}</h2>
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Mandatory Fields */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4">
                  <h3 className="text-xl font-semibold text-white">Primary Filters</h3>
                  <p className="text-red-100 mt-1">All fields are mandatory</p>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Revised Interest Rate */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Revised Interest Rate (bps) *
                    </label>
                    <input
                      type="number"
                      value={mandatoryFilters.revisedInterestRate}
                      onChange={handleMandatoryChange('revisedInterestRate')}
                      placeholder="e.g., 375"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    />
                    <p className="text-xs text-gray-500">Enter rate in basis points (100 bps = 1%)</p>
                  </div>

                  {/* Minimum Monthly Savings */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Minimum Monthly Savings *
                    </label>
                    <input
                      type="number"
                      value={mandatoryFilters.minimumMonthlySavings}
                      onChange={handleMandatoryChange('minimumMonthlySavings')}
                      placeholder="e.g., 250"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    />
                    <p className="text-xs text-gray-500">Enter amount in dollars</p>
                  </div>

                  {/* Maximum Payback Period */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Maximum Payback Period (No. of Months) *
                    </label>
                    <input
                      type="number"
                      value={mandatoryFilters.maximumPaybackPeriod}
                      onChange={handleMandatoryChange('maximumPaybackPeriod')}
                      placeholder="e.g., 36"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                    />
                    <p className="text-xs text-gray-500">Number of months to break even</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Campaign Fields */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
                  <h3 className="text-xl font-semibold text-white">Campaign Filters</h3>
                  <p className="text-green-100 mt-1">Optional campaign parameters</p>
                </div>
                
                <div className="p-6 space-y-4">
                  {campaigns.switchStates.map((state, index) => (
                    <div key={index}>
                      <RenderField
                        enabled={state.enabled}
                        id={state.id}
                        value={campaignData?.[state.id]}
                        setValue={(val) =>
                          setCampaignData({ ...campaignData, [state.id]: val })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              className="bg-lime-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-lime-700 transition-colors duration-200"
              onClick={submit}
            >
              View Viable Loans
            </button>
          </div>
        ) : (
          <>No Campaign created by admin</>
        )}
      </div>
      <RoleSwitch />
    </>
  );
}

export default FilterCampaign;
