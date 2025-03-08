import React, { useEffect, useState, useContext } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Rotractnav from "../components/Rotractnav";
import Rotractfooter from "../components/Rotractfooter";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { UserContext } from '../common/UserContext';

const RotaractNewsFeed = () => {
  const [interactions, setInteractions] = useState({});
  const [news, setNews] = useState([]);
  const [searchParams] = useSearchParams();
  const clubId = searchParams.get('clubId');
  const { user } = useContext(UserContext);
  const memberId = user?.id; 
  const clubName = searchParams.get("clubName");

  useEffect(() => {
    if (clubId) {
      getNewsByClub();
    }
  }, [clubId]);

  useEffect(() => {
    const initialInteractions = {};
    news.forEach((item) => {
      initialInteractions[item.newsId] = {
        liked: item.like?.membersLike?.includes(memberId) || false,
        disliked: item.like?.membersDislike?.includes(memberId) || false,
      };
    });
    setInteractions(initialInteractions);
  }, [news, memberId]);

  // Fetch news by club ID
  const getNewsByClub = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/v1/news/${clubId}/getAllNews`
      );
      console.log("Fetched News:", response.data); // Debugging
      setNews(response.data);
    } catch (error) {
      console.error('Error while getting news:', error);
    }
  };

  // Handle like action
  const handleLike = async (id) => {
    try {
      if (!clubId || !memberId) return;

      if (interactions[id]?.liked) {
        await axios.post(
          `http://localhost:7000/api/v1/like/${id}/removeLikeNews/${clubId}/${memberId}`
        );
        setInteractions((prev) => ({
          ...prev,
          [id]: { liked: false, disliked: prev[id]?.disliked || false },
        }));
      } else {
        await axios.post(
          `http://localhost:7000/api/v1/like/${id}/addLikeNews/${clubId}/${memberId}`
        );
        if (interactions[id]?.disliked) {
          await axios.post(
            `http://localhost:7000/api/v1/like/${id}/removeLikeNews/${clubId}/${memberId}`
          );
        }
        setInteractions((prev) => ({
          ...prev,
          [id]: { liked: true, disliked: false },
        }));
      }

      // Refresh news data after interaction
      getNewsByClub();
    } catch (error) {
      console.error('Error while handling like:', error);
    }
  };

  // Handle dislike action
  const handleDislike = async (id) => {
    try {
      if (!clubId || !memberId) return;

      if (interactions[id]?.disliked) {
        await axios.post(
          `http://localhost:7000/api/v1/like/${id}/removeLikeNews/${clubId}/${memberId}`
        );
        setInteractions((prev) => ({
          ...prev,
          [id]: { disliked: false, liked: prev[id]?.liked || false },
        }));
      } else {
        await axios.post(
          `http://localhost:7000/api/v1/like/${id}/addLikeNews/${clubId}/${memberId}`
        );
        if (interactions[id]?.liked) {
          await axios.post(
            `http://localhost:7000/api/v1/like/${id}/removeLikeNews/${clubId}/${memberId}`
          );
        }
        setInteractions((prev) => ({
          ...prev,
          [id]: { disliked: true, liked: false },
        }));
      }

      // Refresh news data after interaction
      getNewsByClub();
    } catch (error) {
      console.error('Error while handling dislike:', error);
    }
  };

  // Format date and time
  const formatDateTime = (dateArray, timeArray) => {
    if (!dateArray || !timeArray) return "Unknown";
    const date = new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      timeArray[0],
      timeArray[1],
      timeArray[2]
    );
    return date.toLocaleString();
  };

  const toCamelCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Rotractnav />
      <div className="max-w-2xl mx-auto pt-32">
        <div className="bg-white/30 backdrop-blur-sm rounded-xl mb-4">
          <div className="px-4 py-6">
            <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {clubName} News Feed
            </h1>
            <div className="mt-1 w-24 h-1 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          {news.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 text-center">
              <p className="text-gray-600 text-lg">No news items available</p>
            </div>
          ) : (
            news.map((item) => (
              <div
                key={item.newsId}
                className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/50 backdrop-blur-sm"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <span className="font-bold text-lg text-gray-900">
                      {item.publisherName}
                    </span>
                    <span className="ml-2 text-gray-600 font-medium">
                      @{item.publisherName}
                    </span>
                    <span className="mx-2 text-gray-600">·</span>
                    <span className="text-gray-600 font-medium">
                      {formatDateTime(item.publishedDate, item.publishedTime)}
                    </span>
                  </div>

                  <h2 className="mt-2 text-xl font-bold text-gray-900">
                    {item.newsTitle}
                  </h2>

                  <div className="mt-4">
                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center space-x-8">
                    <button
                      onClick={() => handleLike(item.newsId)}
                      className={`flex items-center group ${
                        interactions[item.newsId]?.liked ? 'text-red-600' : 'text-gray-600'
                      }`}
                    >
                      <div className="p-2 rounded-full group-hover:bg-red-100 transition-colors duration-200">
                        <ThumbsUp
                          size={22}
                          className={`${
                            interactions[item.newsId]?.liked ? 'fill-current' : ''
                          }`}
                        />
                      </div>
                      <span className="ml-1 text-base font-semibold group-hover:text-red-600">
                        {item.like?.membersLike?.length || 0}
                      </span>
                    </button>

                    <button
                      onClick={() => handleDislike(item.newsId)}
                      className={`flex items-center group ${
                        interactions[item.newsId]?.disliked ? 'text-blue-600' : 'text-gray-600'
                      }`}
                    >
                      <div className="p-2 rounded-full group-hover:bg-blue-100 transition-colors duration-200">
                        <ThumbsDown
                          size={22}
                          className={`${
                            interactions[item.newsId]?.disliked ? 'fill-current' : ''
                          }`}
                        />
                      </div>
                      <span className="ml-1 text-base font-semibold group-hover:text-blue-600">
                        {item.like?.membersDislike?.length || 0}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Rotractfooter />
    </div>
  );
};

export default RotaractNewsFeed;