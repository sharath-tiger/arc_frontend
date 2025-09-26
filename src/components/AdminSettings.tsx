import { useEffect, useState } from "react";
import NewCampaign from "./NewCampaign";
import RoleSwitch from "./RoleSwitch";

interface Campaign {
  id: number;
  name: string;
  switchStates?: Array<any>;
}

function AdminSettings() {
  const [isAddMode, setIsAddMode] = useState(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignId, setCampaignId] = useState<number | null>(null);
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
  const deleteCampaign = (id: number) => {
    const updatedCampaigns = campaigns.filter((campaign) => campaign.id !== id);
    setCampaigns(updatedCampaigns);
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  };
  const editCampaign = (id: number) => {
    setIsAddMode(false);
    const campaignToEdit = campaigns.find((campaign) => campaign.id === id);
    if (campaignToEdit) {
      // Logic to open the modal with campaign data for editing
      setIsModalOpen(true);
      // You might want to pass the campaign data to the NewCampaign component
      // This requires modifying the NewCampaign component to accept initial data
      setCampaignId(campaignToEdit.id);
    }
  };
  return (
    <>
      <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
        <h1 className="text-3xl">ARC - Settings </h1>
        <p className="bg-gray-200 p-2 inline-block text-xs mt-2 bg-lime-600 text-white">
          ADMIN
        </p>
        <div className="shadow-md bg-white mt-5 rounded-lg">
          <div className="flex justify-between items-center p-4 border-b ">
            <h2>Campaign</h2>
            <button
              className="bg-lime-600 text-white px-4 py-2 rounded"
              onClick={() => {
                setIsAddMode(true);
                setIsModalOpen(true);
              }}
            >
              Create New Campaign
            </button>
          </div>
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
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => editCampaign(campaign.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => deleteCampaign(campaign.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <NewCampaign
        isAddMode={isAddMode}
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setCampaigns={(data) => {
          if (isAddMode) {
            setCampaigns((prev) => [...prev, data]);
            localStorage.setItem(
              "campaigns",
              JSON.stringify([...campaigns, data])
            );
          } else {
            const toBeUpdatedIndex = campaigns.findIndex(
              (c) => c.id === campaignId
            );
            if (toBeUpdatedIndex !== -1) {
              const updatedCampaigns = [...campaigns];
              updatedCampaigns[toBeUpdatedIndex] = {
                ...updatedCampaigns[toBeUpdatedIndex],
                ...data,
              };
              setCampaigns(updatedCampaigns);

              localStorage.setItem(
                "campaigns",
                JSON.stringify(updatedCampaigns)
              );
            }
          }
        }}
        campaignId={campaignId}
      />
      <RoleSwitch />
    </>
  );
}

export default AdminSettings;
