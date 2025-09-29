import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import RoleSwitch from "./RoleSwitch";
import { useNavigate } from "react-router-dom";
interface Campaign {
  id: number;
  name: string;
  switchStates?: Array<any>;
}
function ListCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  useEffect(() => {
    const storedCampaigns = localStorage.getItem("campaigns");

    if (storedCampaigns) {
      const parsedCampaigns = JSON.parse(storedCampaigns);

      if (Array.isArray(parsedCampaigns)) {
        setCampaigns(parsedCampaigns);
      } else {
        setCampaigns([]);
      }
    }
  }, []);
  return (
    <>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <TopBar role="ANALYST" title="All Campaigns" />

        <div>
          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign Name
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="bg-lime-600 text-white px-4 py-2 rounded-md"
                        onClick={() =>
                          navigate(`/filter-campaign/${campaign.id}`)
                        }
                      >
                        Launch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RoleSwitch />
    </>
  );
}

export default ListCampaigns;
