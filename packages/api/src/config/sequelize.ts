import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';

dotenv.config();

const config: any = {
    // The database dialect to use. This should be 'postgres' for PostgreSQL.
    dialect: 'postgres',

    // The hostname of the database server.
    host: process.env.DB_HOST,

    // The port number of the database server.
    port: process.env.DB_PORT,

    // The name of the database.
    database: process.env.DB_NAME,

    // The username for the database connection.
    username: process.env.DB_USER,

    // The password for the database connection.
    password: process.env.DB_PASSWORD,

    // You can specify additional options here as needed.
    // For example, timezone: 'UTC' to set the database timezone to UTC.

    // For production, you might want to use a connection pool to manage database connections efficiently.
    pool: {
        max: 10, // Maximum number of connections in the pool
        min: 0,  // Minimum number of connections in the pool
        acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released when the pool is at its maximum size.
    },
};

const sequelize = new Sequelize(config);

export default sequelize;
