import React, { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface FormField {
  id: string;
  title: string;
  type: string;
  options?: string[];
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
      type: "text",
      options: []
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: string, property: keyof FormField, value: string | string[]) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, [property]: value } : field
    ));
  };

  const addOption = (fieldId: string) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId 
        ? { ...field, options: [...(field.options || []), ''] }
        : field
    ));
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId 
        ? { 
            ...field, 
            options: field.options?.map((opt, idx) => idx === optionIndex ? value : opt) || []
          }
        : field
    ));
  };

  const deleteOption = (fieldId: string, optionIndex: number) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId 
        ? { 
            ...field, 
            options: field.options?.filter((_, idx) => idx !== optionIndex) || []
          }
        : field
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] relative animate-fadeIn flex flex-col">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            
            {/* Header */}
            <div className="p-8 pb-4 border-b">
              <h2 className="text-xl font-semibold">Create New Campaign</h2>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-4">
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
                  <div className="space-y-4">
                    {formFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="p-4 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-2">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
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
                                  onChange={(e) => {
                                    updateField(field.id, 'type', e.target.value);
                                    if (e.target.value === 'select' && !field.options?.length) {
                                      updateField(field.id, 'options', ['']);
                                    }
                                  }}
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

                            {/* Options for dropdown/select fields */}
                            {field.type === 'select' && (
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <label className="block text-xs font-medium text-gray-700">
                                    Options
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => addOption(field.id)}
                                    className="flex items-center px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add Option
                                  </button>
                                </div>
                                <div className="space-y-2 max-h-32 overflow-y-auto">
                                  {field.options?.map((option, optionIndex) => (
                                    <div key={optionIndex} className="flex items-center space-x-2">
                                      <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                                        className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#5A8A22]"
                                        placeholder={`Option ${optionIndex + 1}`}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => deleteOption(field.id, optionIndex)}
                                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                                        title="Delete option"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
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
                      </div>
                    ))}
                  </div>
                )}

                {/* Form Preview */}
                {formFields.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Form Preview</h4>
                    <div className="p-4 bg-white border rounded-lg space-y-3 max-h-64 overflow-y-auto">
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
                              {field.options?.map((option, idx) => (
                                <option key={idx} value={option}>
                                  {option || `Option ${idx + 1}`}
                                </option>
                              ))}
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
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-3 p-8 pt-4 border-t bg-gray-50">
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
