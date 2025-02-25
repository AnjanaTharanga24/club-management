import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Calendar, MapPin, Clock } from 'lucide-react';
import Rotractnav from "../components/Rotractnav";
import Rotractfooter from "../components/Rotractfooter";

const RotracEvent = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Annual Blood Donation Camp",
      date: "2025-02-15",
      time: "9:00 AM",
      location: "University Main Hall",
      description: "Join us for our annual blood donation camp. Your small contribution can save lives!",
      image: "/bloodeventroc.jpg",
      likes: 24,
      isLiked: false,
      comments: [
        { id: 1, user: "Sarah M.", text: "Looking forward to participating!" },
        { id: 2, user: "John D.", text: "Great initiative!" }
      ]
    },
    {
      id: 2,
      title: "Leadership Workshop 2025",
      date: "2025-03-01",
      time: "2:00 PM",
      location: "Science Faculty Auditorium",
      description: "Develop your leadership skills with industry experts. Certificate will be provided.",
      image: "/leadershipeventroc.jpg",
      likes: 18,
      isLiked: false,
      comments: [
        { id: 1, user: "Mike R.", text: "Will there be any prerequisites?" }
      ]
    },
    {
      id: 3,
      title: "Tech Innovation Hackathon",
      date: "2025-03-15",
      time: "8:00 AM",
      location: "Computing Faculty Labs",
      description: "Join us for a 24-hour hackathon! Build innovative solutions for real-world problems. Amazing prizes to be won, including internship opportunities with leading tech companies. Food and refreshments will be provided.",
      image: "/hackeventroc.jpg",
      likes: 45,
      isLiked: false,
      comments: [
        { id: 1, user: "Alex T.", text: "Can't wait! Already forming my team 🚀" },
        { id: 2, user: "Lisa K.", text: "Will there be mentors available during the event?" },
        { id: 3, user: "Dev P.", text: "Looking for team members! DM if interested!" }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");

  const handleLike = (eventId) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          likes: event.isLiked ? event.likes - 1 : event.likes + 1,
          isLiked: !event.isLiked
        };
      }
      return event;
    }));
  };

  const handleComment = (eventId, comment) => {
    if (!comment.trim()) return;
    
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          comments: [...event.comments, {
            id: event.comments.length + 1,
            user: "User",
            text: comment
          }]
        };
      }
      return event;
    }));
    setNewComment("");
  };

  const handleShare = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      alert(`Sharing event: ${event.title}`);
    }
  };

  return (
    <div> <Rotractnav />
    <div className="min-h-screen bg-gradient-to-tl from-indigo-900 via-purple-900 to-pink-900">
      
      <div className="max-w-6xl mx-auto p-8 pt-32">
        <div className="text-center mb-16 mt-8 ">
          <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 mb-6">
            Rotract Club Events
          </h1>
          <p className="text-cyan-100 text-xl font-light">
            Join us in making a difference through leadership, service, and innovation
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12">
          {events.map(event => (
            <div key={event.id} className="relative bg-black/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
              
              <div className="relative p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full aspect-video object-cover rounded-xl shadow-lg shadow-black/50"
                    />
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-cyan-100">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-cyan-100">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-cyan-100">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
                        {event.title}
                      </h2>
                      <p className="text-cyan-100 leading-relaxed">{event.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-cyan-300">Comments ({event.comments.length})</h3>
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-4">
                        {event.comments.map(comment => (
                          <div key={comment.id} className="flex items-start gap-3 bg-white/5 backdrop-blur p-4 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white font-medium">
                              {comment.user[0]}
                            </div>
                            <div>
                              <p className="font-medium text-cyan-300">{comment.user}</p>
                              <p className="text-cyan-100">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 bg-white/10 backdrop-blur text-cyan-100 px-4 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-cyan-400 placeholder-cyan-300/50"
                      />
                      <button 
                        onClick={() => handleComment(event.id, newComment)}
                        className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-400 text-white rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border-t border-white/10 p-4 bg-white/5 backdrop-blur">
                <div className="flex justify-between w-full">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors text-cyan-100`}
                    onClick={() => handleLike(event.id)}
                  >
                    <Heart className={`w-5 h-5 ${event.isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                    <span>{event.likes}</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors text-cyan-100"
                    onClick={() => {
                      const commentInput = document.querySelector(`input[placeholder="Add a comment..."]`);
                      commentInput?.focus();
                    }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{event.comments.length}</span>
                  </button>
                  
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors text-cyan-100"
                    onClick={() => handleShare(event.id)}
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Rotractfooter />
    </div>
  );
};

export default RotracEvent;