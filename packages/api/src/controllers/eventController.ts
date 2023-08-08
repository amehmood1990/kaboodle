import {Request, Response} from 'express';
import Event from '../models/Event';
import Ticket from '../models/Ticket';
import User from "../models/User";

interface EventController {
    getAllEvents: (req: Request, res: Response) => Promise<void>;
    getEventById: (req: Request, res: Response) => Promise<void>;
    createEvent: (req: Request, res: Response) => Promise<void>;
    updateEvent: (req: Request, res: Response) => Promise<void>;
    deleteEvent: (req: Request, res: Response) => Promise<void>;
    getUserEvents: (req: Request, res: Response) => Promise<void>;
}

const eventController: EventController = {
    getAllEvents: async (req, res) => {
        try {
            const events = await Event.findAll({
                include: [
                    {model: User},
                    {model: Ticket}
                ]
            });
            res.json(events);
        } catch (error) {
            console.error('Error fetching events:', error);
            res.status(500).json({error: 'Error fetching events'});
        }
    },

    getUserEvents: async (req, res) => {
        const UserId = req.user?.userId;// Convert userId to a number
        try {
            const events = await Event.findAll({
                where: { UserId }, // Use "UserId" instead of "userId"
                include: [
                    {model: User},
                    {model: Ticket}
                ]
            });
            res.json(events);
        } catch (error) {
            console.error('Error fetching user events:', error);
            res.status(500).json({ error: 'Error fetching user events' });
        }
    },

    getEventById: async (req, res) => {
        const eventId = parseInt(req.params.id, 10);
        try {
            const event = await Event.findByPk(eventId, {include: Ticket});
            if (event) {
                res.json(event);
            } else {
                res.status(404).json({error: 'Event not found'});
            }
        } catch (error) {
            console.error('Error fetching event:', error);
            res.status(500).json({error: 'Error fetching event'});
        }
    },

    createEvent: async (req, res) => {
        const newEvent = req.body;
        try {
            const event = await Event.create(newEvent);
            res.json(event);
        } catch (error) {
            console.error('Error creating event:', error);
            res.status(500).json({error: 'Error creating event'});
        }
    },

    updateEvent: async (req, res) => {
        const eventId = parseInt(req.params.id, 10);
        const updatedEvent = req.body;
        try {
            const event = await Event.findByPk(eventId);
            if (event) {
                await event.update(updatedEvent);
                res.json(event);
            } else {
                res.status(404).json({error: 'Event not found'});
            }
        } catch (error) {
            console.error('Error updating event:', error);
            res.status(500).json({error: 'Error updating event'});
        }
    },

    deleteEvent: async (req, res) => {
        const eventId = req.params.id;
        console.log({eventId})
        try {
            const event = await Event.findByPk(eventId);
            if (event) {
                await event.destroy();
                res.json({message: 'Event deleted successfully'});
            } else {
                res.status(404).json({error: 'Event not found'});
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            res.status(500).json({error: 'Error deleting event'});
        }
    },

    // Add more controller methods for handling tickets if needed.

};

export default eventController;
