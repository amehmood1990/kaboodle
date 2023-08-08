import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import dotenv from 'dotenv';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & { userId: number };
        }
    }
}

// Load environment variables from .env file
dotenv.config();

// Middleware to authenticate and verify the JWT token
export const authenticateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({error: 'No JWT token provided.'});
        }

        const secretKey = process.env.JWT_SECRET!;
        if (!secretKey) {
            return res.status(500).json({error: 'JWT secret key not configured.'});
        }

        // Verify and decode the JWT token
        const decodedToken = await verifyToken(token, secretKey);
        if (!decodedToken) {
            return res.status(403).json({error: 'Invalid JWT token.'});
        }

        // Attach the decoded user information to the request object
        req.user = decodedToken as JwtPayload & { userId: number };

        next();
    } catch (error: any) {
        console.error('Error verifying JWT token:', error?.message);
        return res.status(500).json({error: 'Error verifying JWT token.'});
    }
};

// Helper function to verify and decode the JWT token
const verifyToken = (
    token: string,
    secretKey: string
): Promise<JwtPayload | null> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Token verification failed
                reject(err);
            } else {
                // Token verification succeeded, and the decoded data is available in the `decoded` variable.
                resolve(decoded as JwtPayload);
            }
        });
    });
};
