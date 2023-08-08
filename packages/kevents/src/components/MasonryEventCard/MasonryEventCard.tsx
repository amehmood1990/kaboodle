// MasonryEventCard.tsx
import * as React from 'react';
import {Divider, Grid, Typography} from '@mui/material';
import EventCard from "../EventCard/EventCard";
import Event from '../../types'

const MasonryEventCard: React.FC<{ events: Event[] }> = ({events}) => {
    const [expanded, setExpanded] = React.useState<string | null>(null);

    const handleExpandClick = (eventId: string) => {
        setExpanded(expanded === eventId ? null : eventId);
    };

    return (
        <>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                        <EventCard event={event} expanded={expanded}  handleExpandClick={handleExpandClick}/>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default MasonryEventCard;
