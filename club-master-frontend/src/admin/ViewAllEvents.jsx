import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, X, Calendar, Map, Clock, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ViewAllClubs() {
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);
    const [executivePanelMembers, setExecutivePanelMembers] = useState([]);
    const [clubEvents, setClubEvents] = useState([]);
    const [loadingPanel, setLoadingPanel] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch clubs data from the backend
        const fetchClubs = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:7000/api/v1/club/all');
                setClubs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching clubs:', error);
                setLoading(false);
            }
        };

        fetchClubs();
    }, []);

    const handleViewPanel = async (club) => {
        setSelectedClub(club);
        setLoadingPanel(true);
        setShowPanel(true);
        
        try {
            // Replace with your actual API endpoint to fetch executive panel members
            const response = await axios.get(`http://localhost:7000/api/v1/club/${club.clubId}/members`);
            setExecutivePanelMembers(response.data || []);
        } catch (error) {
            console.error('Error fetching panel members:', error);
            setExecutivePanelMembers([]);
        } finally {
            setLoadingPanel(false);
        }
    };

    const handleViewEvents = async (club) => {
        setSelectedClub(club);
        setLoadingEvents(true);
        setShowEvents(true);
        
        try {
            const response = await axios.get(`http://localhost:7000/api/v1/event/${club.clubId}/events`);
            setClubEvents(response.data || []);
        } catch (error) {
            console.error('Error fetching club events:', error);
            setClubEvents([]);
        } finally {
            setLoadingEvents(false);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:7000/api/v1/event/delete/${eventId}`);
                    
                    // Update the events list after deletion
                    setClubEvents(clubEvents.filter(event => event.eventId !== eventId));
                    
                    Swal.fire(
                        'Deleted!',
                        'The event has been deleted successfully.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error deleting event:', error);
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the event.',
                        'error'
                    );
                }
            }
        });
    };

    const closeModal = () => {
        setShowPanel(false);
        setShowEvents(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        // Handle time format HH:MM:SS
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">All Clubs</h1>
                <div className="bg-blue-100 rounded-lg px-4 py-2">
                    <span className="text-blue-800 font-medium">{clubs.length} Clubs</span>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : clubs.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No clubs found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clubs.map((club) => (
                        <div 
                            key={club.clubId} 
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3"></div>
                            <div className="p-6">
                                <h3 className="font-bold text-xl text-gray-800 mb-2 truncate">{club.clubName}</h3>
                                <p className="text-gray-600 text-sm mb-4 truncate">{club.clubEmail}</p>
                                
                                <div className="flex items-center mb-6">
                                    <Users size={18} className="text-gray-400 mr-2" />
                                    <span className="text-gray-700">
                                        {club.positionHoldingMembersAndRoles ? club.positionHoldingMembersAndRoles.length : 0} Members with Positions
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <button 
                                        onClick={() => handleViewPanel(club)}
                                        className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                                    >
                                        View Panel
                                    </button>
                                    <button 
                                        onClick={() => handleViewEvents(club)}
                                        className="w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-md transition-colors duration-300"
                                    >
                                        View Events
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Executive Panel Modal */}
            {showPanel && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex justify-between items-center">
                            <h2 className="text-white text-xl font-bold">{selectedClub?.clubName} - Executive Panel</h2>
                            <button 
                                onClick={closeModal}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            {loadingPanel ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : executivePanelMembers.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No executive panel members found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {executivePanelMembers.map((member, index) => (
                                        <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
                                            <div className="flex-shrink-0 h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                                                {member.imageUrl ? (
                                                    <img 
                                                        src={member.imageUrl} 
                                                        alt={member.memberName} 
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                                                        <span className="text-xl font-bold">
                                                            {member.memberName.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">{member.memberName}</h4>
                                                <p className="text-xs text-gray-500 truncate">{member.email}</p>
                                                <div className="mt-1 inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                                    {member.role}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Club Events Modal */}
            {showEvents && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 flex justify-between items-center">
                            <h2 className="text-white text-xl font-bold">{selectedClub?.clubName} - Events</h2>
                            <button 
                                onClick={closeModal}
                                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                            {loadingEvents ? (
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                                </div>
                            ) : clubEvents.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No events found for this club</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {clubEvents.map((event) => (
                                        <div 
                                            key={event.eventId} 
                                            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                                        >
                                            <div className="flex flex-col md:flex-row">
                                                {event.eventImageUrl && (
                                                    <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                                                        <img 
                                                            src={event.eventImageUrl} 
                                                            alt={event.eventName} 
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = '/placeholder-image.png';
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <div className={`p-4 flex-1 ${!event.eventImageUrl ? 'md:w-full' : 'md:w-2/3'}`}>
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{event.eventName}</h3>
                                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                                                                {event.eventType}
                                                            </span>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleDeleteEvent(event.eventId)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                            title="Delete Event"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="space-y-2 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <Calendar size={16} className="mr-2 text-gray-400" />
                                                            <span>{formatDate(event.scheduledDate)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Clock size={16} className="mr-2 text-gray-400" />
                                                            <span>{formatTime(event.scheduledTime)}</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <Map size={16} className="mr-2 text-gray-400" />
                                                            <span>{event.eventLocation}</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mt-4 flex items-center text-sm text-gray-500">
                                                        <span className="flex items-center mr-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                                                            </svg>
                                                            {event.like && event.like.likeCount || 0}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                                                                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
                                                            </svg>
                                                            {event.comments ? event.comments.length : 0}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}