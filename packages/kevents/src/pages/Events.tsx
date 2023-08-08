import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import MasonryEventCard from "../components/MasonryEventCard/MasonryEventCard";
import {fetchUserEvents} from "../utils";

interface Event {
    id: number;
    name: string;
    // add other event properties here
}


const UserEvents: React.FC = () => {
    const [events, setEvents] = useState<Event[] | any>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await fetchUserEvents();
                setEvents(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <Typography variant="h2">Your Events</Typography>
            <hr/>
            <br/>
            {(events?.length) ? <MasonryEventCard events={events}/> : (<div>NO DATA!</div>)}
        </div>
    );
};

export default UserEvents;
