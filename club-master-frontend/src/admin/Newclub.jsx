import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import Adminsidebar from "../components/Adminsidebar";




const ClubRegistrationForm = () => {
  const [formData, setFormData] = useState({
    clubName: '',
    clubAddress: '',
    seniorAdvisor: '',
    clubProducer: '',
    clubVision: '',
    logo: null,
    backgroundImage1: null,
    backgroundImage2: null,
    backgroundImage3: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="flex"> <Adminsidebar />
    
    
    <div className="flex-1 max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-10 ">
        
        
        
      <h2 className="text-2xl font-bold text-center mb-6">New Club Registration</h2>
      
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Information - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Name
            </label>
            <input
              type="text"
              name="clubName"
              value={formData.clubName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter club name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Address
            </label>
            <input
              type="text"
              name="clubAddress"
              value={formData.clubAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter club address"
              required
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senior Advisor
            </label>
            <input
              type="text"
              name="seniorAdvisor"
              value={formData.seniorAdvisor}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter senior advisor name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Producer
            </label>
            <input
              type="text"
              name="clubProducer"
              value={formData.clubProducer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter club producer name"
              required
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Vision
            </label>
            <textarea
              name="clubVision"
              value={formData.clubVision}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter club vision"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Club Logo
            </label>
            <div className="mt-1 flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-2">
                  <Upload className="h-6 w-6 text-gray-400 mb-1" />
                  <p className="text-sm text-gray-500">Click to upload logo</p>
                </div>
                <input
                  type="file"
                  name="logo"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                  required
                />
              </label>
            </div>
          </div>
        </div>

        {/* Background Images Row */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((num) => (
            <div key={num}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background {num}
              </label>
              <div className="mt-1 flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-2">
                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                    <p className="text-xs text-gray-500">Image {num}</p>
                  </div>
                  <input
                    type="file"
                    name={`backgroundImage${num}`}
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
        >
          Register Club
        </button>
        
      </form>
      </div>
    </div>
    
  );
};

export default ClubRegistrationForm;