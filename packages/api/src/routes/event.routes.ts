// event.routes.ts
import {Request, Response, Router} from 'express';
import eventController from '../controllers/eventController';
import {authenticateJWT} from "../middlewares/jwtMiddleware";

const router = Router();

router.get('/events', async (req: Request, res: Response) => {
    await eventController.getAllEvents(req, res);
});

router.get('/events/:id', async (req: Request, res: Response) => {
    await eventController.getEventById(req, res);
});

router.get('/users/events', authenticateJWT, async (req: Request, res: Response) => {
    await eventController.getUserEvents(req, res);
});

router.post('/events', authenticateJWT, async (req: Request, res: Response) => {
    await eventController.createEvent(req, res);
});

router.put('/events/:id', authenticateJWT, async (req: Request, res: Response) => {
    await eventController.updateEvent(req, res);
});

router.delete('/events/:id', authenticateJWT, async (req: Request, res: Response) => {
    await eventController.deleteEvent(req, res);
});

// Add more routes for tickets if needed.

export default router;
