// user.routes.ts
import {Router} from 'express';
import {createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser} from '../controllers/userController';
import {authenticateJWT} from "../middlewares/jwtMiddleware";

const router = Router();

// Public route for creating a new user
router.post('/register', createUser);
router.post('/login', loginUser);

// Protected routes (authentication required)
router.get('/users', authenticateJWT, getAllUsers);
router.get('/users/:id', authenticateJWT, getUserById);
router.put('/users/:id', authenticateJWT, updateUser);
router.delete('/users/:id', authenticateJWT, deleteUser);

export default router;
