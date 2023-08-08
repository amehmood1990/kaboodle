// routes.ts
import {Router} from 'express';
import eventRoutes from './event.routes';
import {authenticateJWT} from '../middlewares/jwtMiddleware';
import authRoutes from "./auth.routes";

const router = Router();

// Public routes (no authentication required)
router.get('/public', (req, res) => {
    res.json({message: 'Public route, no authentication required.'});
});

// Protected routes (authentication required)
router.get('/protected', authenticateJWT, (req, res) => {
    res.json({message: 'Protected route, authentication required.'});
});

// Mount event routes under /api path
router.use('/', eventRoutes);

// Mount auth routes under /api/auth path
router.use('/auth', authRoutes);

export default router;
