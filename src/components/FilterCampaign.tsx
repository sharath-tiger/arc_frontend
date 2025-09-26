import React, { useEffect } from "react";
import { options } from "../global/constants";
import RoleSwitch from "./RoleSwitch";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./TopBar";
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
  const submit = () => {
    console.log("Campaign Data Submitted:", campaignData);
    navigate("/loan-table");
  };
  return (
    <>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <TopBar role="ANALYST" title="Filter Mortgages" />
        {campaigns?.id ? (
          <div className="p-4 border rounded-md mt-4 bg-white shadow-md">
            <h2 className="mb-6 text-lg font-semibold">{campaigns.name}</h2>
            {campaigns.switchStates.map((state, index) => (
              <div key={index} className="w-[25%]">
                {
                  <RenderField
                    enabled={state.enabled}
                    id={state.id}
                    value={campaignData?.[state.id]}
                    setValue={(val) =>
                      setCampaignData({ ...campaignData, [state.id]: val })
                    }
                  />
                }
              </div>
            ))}
            <button
              className="bg-lime-600 text-white px-4 py-2 rounded-md"
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
