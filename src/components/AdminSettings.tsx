import React, { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface FormField {
  id: string;
  title: string;
  type: string;
}

function AdminSettings() {
  const [showModal, setShowModal] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "email", label: "Email" },
    { value: "number", label: "Number" },
    { value: "select", label: "Dropdown" },
    { value: "textarea", label: "Text Area" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio Button" },
    { value: "date", label: "Date" },
  ];

  const addField = () => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      title: "",
      type: "text"
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: string, property: keyof FormField, value: string) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, [property]: value } : field
    ));
  };

  const deleteField = (id: string) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const handleCreateCampaign = () => {
    // Here you would typically save the campaign data
    console.log("Campaign Data:", {
      name: campaignName,
      description: campaignDescription,
      fields: formFields
    });
    
    // Reset form
    setCampaignName("");
    setCampaignDescription("");
    setFormFields([]);
    setShowModal(false);
  };

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
            
            {/* Campaign Basic Info */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A8A22]"
                placeholder="Enter campaign name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A8A22]"
                rows={3}
                placeholder="Enter campaign description"
              />
            </div>

            {/* Dynamic Form Builder */}
            <div className="mb-6" id="form-section">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Form Fields</h3>
                <button
                  type="button"
                  onClick={addField}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Field
                </button>
              </div>

              {formFields.length === 0 ? (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <p>No fields added yet. Click "Add Field" to get started.</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {formFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex-shrink-0">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Field Title
                          </label>
                          <input
                            type="text"
                            value={field.title}
                            onChange={(e) => updateField(field.id, 'title', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#5A8A22]"
                            placeholder="Enter field title"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Field Type
                          </label>
                          <select
                            value={field.type}
                            onChange={(e) => updateField(field.id, 'type', e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#5A8A22]"
                          >
                            {fieldTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => deleteField(field.id)}
                        className="flex-shrink-0 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        title="Delete field"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Form Preview */}
              {formFields.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Form Preview</h4>
                  <div className="p-4 bg-white border rounded-lg space-y-3">
                    {formFields.map((field) => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.title || 'Untitled Field'}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder={`Enter ${field.title || 'value'}`}
                            disabled
                          />
                        ) : field.type === 'select' ? (
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            disabled
                          >
                            <option>Select an option</option>
                          </select>
                        ) : field.type === 'checkbox' ? (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              disabled
                            />
                            <span className="text-sm text-gray-600">Checkbox option</span>
                          </div>
                        ) : field.type === 'radio' ? (
                          <div className="flex items-center">
                            <input
                              type="radio"
                              className="mr-2"
                              disabled
                            />
                            <span className="text-sm text-gray-600">Radio option</span>
                          </div>
                        ) : (
                          <input
                            type={field.type}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder={`Enter ${field.title || 'value'}`}
                            disabled
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#5A8A22] text-white rounded-md hover:bg-[#4a741e] transition-colors"
                onClick={handleCreateCampaign}
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSettings;
