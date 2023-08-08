import {NextFunction, Request, Response} from 'express';

const handleError = (err: unknown, req: Request, res: Response, next?: NextFunction) => {
    if (err instanceof Error) {
        console.error('Error:', err);
        res.status(500).json({error: 'Something went wrong'});
    } else {
        console.error('Unknown Error:', err);
        res.status(500).json({error: 'Unknown error occurred'});
    }

    // Call the next middleware if it's provided
    if (next) {
        next();
    }
};

export default handleError;
