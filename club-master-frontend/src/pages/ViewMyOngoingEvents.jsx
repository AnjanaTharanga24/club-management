import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios';
import { UserContext } from '../common/UserContext';

export default function ViewMyOngoingEvents() {
    const [events, setEvents] = useState([]);

    const {user} = useContext(UserContext);

    useEffect(()=>{
        getOngoingEvents();
    },[]);

    const getOngoingEvents = async () => {
     try {
        const response = await axios.get(`http://localhost:7000/api/v1/event/all-ongoing-events/${user.id}`);
        console.log(response.data);
        setEvents(response.data);
     } catch (error) {
        console.log('Error while getting ongoing events', error);
     }
    }
  return (
    <div>
        <Navbar/>
        <Sidebar/>

        <div>

        </div>
    </div>
  )
}
