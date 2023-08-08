import * as React from 'react';
import {
    Avatar,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    styled,
    Typography,
} from '@mui/material';
import {green, red} from '@mui/material/colors';
import {Delete as DeleteIcon} from '@mui/icons-material';
import Event from "../../types";
import TicketCard from "../Ticket/Ticket";
import {deleteEvent} from "../../utils";

interface EventCardProps {
    event: Event;
    expanded: string | null;
    handleExpandClick?: (id: string) => void;
}

const CardContainer = styled(Card)(({theme}) => ({
    borderRadius: 12,
    marginBottom: theme.spacing(3),
}));

const EventCard: React.FC<EventCardProps> = ({event, expanded, handleExpandClick}) => {
    const currentUser = localStorage.getItem('username');
    const isUserEventCreator = currentUser === event?.User?.username;
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);

    const handleDelete = async (id: any) => {
        try {
            setIsDeleting(true);
            await deleteEvent(id);
            // Update the events list after deletion
            console.log('Event deleted successfully');
            setIsDeleting(false);
            setIsConfirmationOpen(false);
            window.location.reload(); // Refresh the page after deletion
        } catch (error) {
            console.error('Error deleting event:', error);
            setIsDeleting(false);
            setIsConfirmationOpen(false);
        }
    };

    const handleConfirmationOpen = (e: any) => {
        e.stopPropagation();
        setIsConfirmationOpen(true);
    };

    const handleConfirmationClose = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <CardContainer>
            <CardActionArea onClick={() => handleExpandClick?.(event.id)}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: event.User.username === 'admin' ? red[500] : green[500]}}>
                            {event.User.username[0]}
                        </Avatar>
                    }
                    action={
                        isUserEventCreator && (
                            <React.Fragment>
                                <IconButton onClick={handleConfirmationOpen} aria-label="delete event"
                                            disabled={isDeleting}>
                                    <DeleteIcon/>
                                </IconButton>
                                <Dialog open={isConfirmationOpen} onClose={handleConfirmationClose}>
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            {`Are you sure you want to delete ${event.name}?`}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <IconButton onClick={handleConfirmationClose} color="primary">
                                            Cancel
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(event.id)} color="primary" autoFocus
                                                    disabled={isDeleting}>
                                            Delete
                                        </IconButton>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        )
                    }
                    title={event.name}
                    subheader={event.date}
                />
                <CardMedia component="img" height="194" image="https://picsum.photos/200" alt="Event"/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {event.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                    {`Tickets: ${event.Tickets.length}`}
                </Typography>
            </CardActions>
            <Collapse in={expanded === event.id} timeout="auto" unmountOnExit>
                <CardContent>
                    {event.Tickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket}/>
                    ))}
                </CardContent>
            </Collapse>
        </CardContainer>
    );
};

export default EventCard;
