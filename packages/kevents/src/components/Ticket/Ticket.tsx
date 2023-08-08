// Ticket.tsx
import * as React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {green, red} from '@mui/material/colors';

interface Ticket {
    id: string;
    name: string;
    type: string;
    price: string;
    bookingFee: string;
    availability: string;
}

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ticket}) => (
    <Card>
        <CardContent>
            <Typography variant="h6" gutterBottom>
                {ticket.name} ({ticket.type})
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Price: £{ticket.price}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                + Booking Fee: £{ticket.bookingFee}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
                Availability: <span
                style={{color: ticket.availability === 'Available' ? green[500] : red[500]}}>{ticket.availability}</span>
            </Typography>
        </CardContent>
    </Card>
);

export default TicketCard;
