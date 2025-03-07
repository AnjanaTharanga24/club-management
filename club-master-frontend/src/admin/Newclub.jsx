import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ClubRegistrationForm = () => {
  const [formData, setFormData] = useState({
    clubName: '',
    clubAddress: '',
    clubSeniorAdviser: '',
    clubProducer: '',
    clubVision: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);

    try {
      const response = await axios.post('http://localhost:7000/api/v1/club/save', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Club created successfully:', response.data);
      Swal.fire({
                    title: "Submitted",
                    text: "New club created successful",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#fff",
                    customClass: {
                      popup: "swal-popup",
                    },
                  })
      

    } catch (error) {
      console.error('Error while creating club:', error.response ? error.response.data : error.message);
       Swal.fire({
                    title: "Creation Failed",
                    text: "Something went wrong. Please try again.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                    confirmButtonColor: "#d33",
                    background: "#fff",
                    customClass: {
                      title: "swal-title",
                      popup: "swal-popup",
                    },
                  });
    }
  };

  const handleReset = () =>{
    setFormData({
      clubName: '',
      clubAddress: '',
      clubSeniorAdviser: '',
      clubProducer: '',
      clubVision: '',
    })
  }
  
// const handleImageChange = (e) => {
//   const { name, files } = e.target;
//   setFormData(prev => ({
//     ...prev,
//     [name]: files[0]
//   }));
// };


  return (
    <div className="flex-1 p-5  mx-auto bg-white rounded-lg shadow-lg p-8 mt-10" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' , width: '1100px',height: '510px'}}>
      <h2 className="text-2xl font-bold text-center mb-6">New Club Registration</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senior Advisor
            </label>
            <input
              type="text"
              name="clubSeniorAdviser"
              value={formData.clubSeniorAdviser}
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

        {/* <div>
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
          </div> */}

          {/* Background Images Row */}
          {/* <div className="grid grid-cols-3 gap-4">
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

                    accept="image/*"
                    required
                  />
                </label>
              </div>
            </div>
          ))}
        </div> */}

        <div className='d-flex gap-5'>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6"
        >
          Register Club
        </button>

        
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-6 "
          onClick={handleReset}
        >
          Reset
        </button>
        </div>

        
      </form>
    </div>
  );
};

export default ClubRegistrationForm;