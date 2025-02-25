import React, { useState } from 'react';
import { Heart, ThumbsDown } from 'lucide-react';
import Rotractnav from "../components/Rotractnav";
import Rotractfooter from "../components/Rotractfooter";

const RotaractNewsFeed = () => {
  const [interactions, setInteractions] = useState({});

  const newsItems = [
    {
      id: 1,
      author: "Rotaract Club",
      username: "@rotaractofficial",
      timestamp: "2h ago",
      content: "🎉 Join us this weekend for our Annual Community Service Drive! We'll be cleaning up Paradise Beach and planting trees. Bring your friends and let's make a difference together! #RotaractInAction",
      likes: 45,
      bgColor: "from-blue-50 to-green-50"
    },
    {
      id: 2,
      author: "Club President",
      username: "@president",
      timestamp: "5h ago",
      content: "Congratulations to our members who participated in the District Leadership Training! Your dedication to personal growth inspires us all. Special shoutout to Sarah for winning the Best Leader award! 🏆 #RotaractLeadership #YouthInAction",
      likes: 32,
      bgColor: "from-purple-50 to-pink-50"
    },
    {
      id: 3,
      author: "Events Committee",
      username: "@events",
      timestamp: "1d ago",
      content: "📢 Next week's professional development workshop on 'Digital Marketing Essentials' is now open for registration. Limited seats available!\n\n🗓️ Date: March 1st\n📍 Location: Main Auditorium\n⏰ Time: 2 PM - 5 PM\n\n#RotaractWorkshop #SkillDevelopment",
      likes: 28,
      bgColor: "from-yellow-50 to-orange-50"
    }
  ];

  const handleLike = (id) => {
    setInteractions(prev => ({
      ...prev,
      [id]: { 
        liked: !prev[id]?.liked,
        disliked: false // Ensures dislike is removed when liking
      }
    }));
  };

  const handleDislike = (id) => {
    setInteractions(prev => ({
      ...prev,
      [id]: { 
        disliked: !prev[id]?.disliked,
        liked: false // Ensures like is removed when disliking
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Rotractnav />
    
      <div className="max-w-2xl mx-auto pt-32">
      
        {/* Header */}
        <div className="bg-white/30 backdrop-blur-sm rounded-xl mb-4">
          <div className="px-4 py-6">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rotaract News Feed
            </h1>
            <div className="mt-1 w-24 h-1 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* News Feed */}
        <div className="space-y-4 p-4">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-gradient-to-r ${item.bgColor} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center">
                  <span className="font-bold text-lg text-gray-900">{item.author}</span>
                  <span className="ml-2 text-gray-600 font-medium">{item.username}</span>
                  <span className="mx-2 text-gray-600">·</span>
                  <span className="text-gray-600 font-medium">{item.timestamp}</span>
                </div>

                {/* Content */}
                <div className="mt-4">
                  <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line font-medium">
                    {item.content}
                  </p>
                  
                  {item.image && (
                    <div className="mt-4 rounded-xl overflow-hidden border border-white/50">
                      <img 
                        src={item.image} 
                        alt="News content" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Interaction buttons */}
                <div className="mt-6 flex items-center space-x-8">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className={`flex items-center group ${interactions[item.id]?.liked ? 'text-red-600' : 'text-gray-600'}`}
                  >
                    <div className="p-2 rounded-full group-hover:bg-red-100 transition-colors duration-200">
                      <Heart 
                        size={22} 
                        className={`${interactions[item.id]?.liked ? 'fill-current' : ''}`}
                      />
                    </div>
                    <span className="ml-1 text-base font-semibold group-hover:text-red-600">
                      {(item.likes + (interactions[item.id]?.liked ? 1 : 0)).toLocaleString()}
                    </span>
                  </button>

                  <button 
                    onClick={() => handleDislike(item.id)}
                    className={`flex items-center group ${interactions[item.id]?.disliked ? 'text-blue-600' : 'text-gray-600'}`}
                  >
                    <div className="p-2 rounded-full group-hover:bg-blue-100 transition-colors duration-200">
                      <ThumbsDown 
                        size={22} 
                        className={`${interactions[item.id]?.disliked ? 'fill-current' : ''}`}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Rotractfooter />
    </div>
  );
};

export default RotaractNewsFeed;
