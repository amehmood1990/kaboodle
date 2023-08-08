// src/pages/LandingPage.tsx
import React, {useEffect, useState} from "react";
import Event from "../../types";
import MasonryEventCard from "../../components/MasonryEventCard/MasonryEventCard";
import {fetchEvents} from "../../utils";
import {Divider, Typography} from "@mui/material";

const LandingPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const eventsData = await fetchEvents();
            setEvents(eventsData);
        };

        fetchData();
    }, []);

    return (<>
            <Typography variant="h3">LATEST EVENTS</Typography>
            <Divider/>
            <br/>
            <MasonryEventCard events={events}/>
        </>
    );
};

export default LandingPage;
