import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/sequelize';
import Ticket from './Ticket';
import User from "./User";

interface EventAttributes {
    id: string;
    name: string;
    date: string;
    description: string;
    UserId: number;
}

interface EventCreationAttributes extends Optional<EventAttributes, 'id'> {
}

class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
    public id!: string;
    public name!: string;
    public date!: string;
    public description!: string;
    public UserId!: number;
}

Event.init(
    {
        id: {
            type: DataTypes.UUID, // Assuming you're using UUID as the primary key
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'events',
    }
);

// Define the association with Ticket model
Event.hasMany(Ticket, {foreignKey: 'eventId'});
Event.belongsTo(User);


export default Event;
