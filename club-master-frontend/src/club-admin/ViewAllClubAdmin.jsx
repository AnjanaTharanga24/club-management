import React, { useState, useEffect } from 'react';
import { User, Mail, Building, Plus, Trash2 } from 'lucide-react';

export default function ViewAllClubAdmin() {
  const [clubAdmins, setClubAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setClubAdmins([
        {
          clubAdminId: "ca1",
          clubId: "c1",
          memberId: "m1",
          fullName: "John Doe",
          email: "john.doe@example.com",
          username: "johndoe"
        },
        {
          clubAdminId: "ca2",
          clubId: "c2",
          memberId: "m2",
          fullName: "Jane Smith",
          email: "jane.smith@example.com",
          username: "janesmith"
        },
        {
          clubAdminId: "ca3",
          clubId: "c1",
          memberId: "m3",
          fullName: "Robert Johnson",
          email: "robert.j@example.com",
          username: "robertj"
        },
        {
          clubAdminId: "ca4",
          clubId: "c3",
          memberId: "m4",
          fullName: "Sarah Williams",
          email: "sarah.w@example.com",
          username: "sarahw"
        },
        {
          clubAdminId: "ca5",
          clubId: "c2",
          memberId: "m5",
          fullName: "Michael Brown",
          email: "michael.b@example.com",
          username: "michaelb"
        },
        {
          clubAdminId: "ca6",
          clubId: "c3",
          memberId: "m6",
          fullName: "Emily Davis",
          email: "emily.d@example.com",
          username: "emilyd"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-purple-500', 'bg-pink-500', 'bg-blue-500', 
      'bg-indigo-500', 'bg-teal-500', 'bg-green-500',
      'bg-yellow-500', 'bg-orange-500', 'bg-red-500'
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    console.log(`Deleting admin with ID: ${id}`);
    setClubAdmins(clubAdmins.filter(admin => admin.clubAdminId !== id));
  };

  const handleCardClick = (admin) => {
    console.log(`Viewing details for: ${admin.fullName}`);

  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Club Administrators</h1>
          <p className="text-gray-600">Manage your club's administrative team</p>
        </div>
        <button className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Admin
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading administrators...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubAdmins.map((admin) => {
            const avatarColor = getAvatarColor(admin.fullName);
            
            return (
              <div 
                key={admin.clubAdminId} 
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 cursor-pointer relative"
                onClick={() => handleCardClick(admin)}
              >
    
                <button 
                  className="absolute top-3 right-3 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
                  onClick={(e) => handleDelete(admin.clubAdminId, e)}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-20 relative">
                  <div className={`${avatarColor} w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white absolute -bottom-8 left-6 border-4 border-white shadow-md`}>
                    {getInitials(admin.fullName)}
                  </div>
                </div>
                
                <div className="p-6 pt-12">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{admin.fullName}</h2>
                  <p className="text-indigo-600 font-medium mb-4">Club Admin</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-700">
                      <User className="h-5 w-5 mr-3 text-gray-500" />
                      <span>{admin.username}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Mail className="h-5 w-5 mr-3 text-gray-500" />
                      <span>{admin.email}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <Building className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Club: <span className="font-medium">{admin.clubId}</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <span className="text-sm text-gray-500">Member ID: {admin.memberId}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}