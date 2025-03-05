import React, { useState } from "react";
import { User, Mail, Phone, Lock, UserPlus, X } from "lucide-react";
import "../components/CreateMainAdmin.css";

const CreateMainAdmin = () => {
  return (
    <div className="bg-white shadow-lg p-5 create-admin">
      <div className="text-center mb-6 ">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
          <UserPlus className="mr-3 text-blue-600" size={36} />
          Create Main Admin
        </h1>
        <p className="text-gray-500 mt-2">Set up a new administrator account</p>
      </div>

      <form className="space-y-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <User className="inline-block mr-2 text-blue-600" size={20} />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <Mail className="inline-block mr-2 text-blue-600" size={20} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter email address"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <Phone className="inline-block mr-2 text-blue-600" size={20} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              <User className="inline-block mr-2 text-blue-600" size={20} />
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Choose a username"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            <Lock className="inline-block mr-2 text-blue-600" size={20} />
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Create a strong password"
            required
          />
        </div>

        <div className="flex justify-between mt-5">
          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <UserPlus className="mr-2" size={20} />
            Create Admin
          </button>
          <button
            type="button"
           
            className="flex items-center px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <X className="mr-2" size={20} />
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMainAdmin;
