import dotenv from 'dotenv';
import express, {Application} from 'express';
import cors from 'cors';
import sequelize from './config/sequelize';
import rootRoutes from "./routes/routes";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startApp(): Promise<void> {
    const app: Application = express();

    // Middleware to parse JSON and handle URL-encoded bodies
    app.use(cors({
        origin: 'http://localhost:3000', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // allow session cookie from browser to pass through
    }))
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    // Mount the eventRouter to handle routes
    app.use('/api', rootRoutes);

    // Default route to handle unknown endpoints
    app.use((req, res) => {
        res.status(404).json({error: 'Not Found'});
    });

    try {
        // Sync Sequelize models with the database and start the server
        await sequelize.sync();
        console.log('Database synced successfully');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Error syncing database:', err);
    }
}

startApp();
