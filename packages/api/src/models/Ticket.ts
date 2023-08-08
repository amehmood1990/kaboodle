import {DataTypes, Model, Optional} from 'sequelize';
import sequelize from '../config/sequelize';
import Event from './Event';

interface TicketAttributes {
    id: string;
    name: string;
    type: string;
    price: number;
    bookingFee: number;
    availability: string;
    eventId: string;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {
}

class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
    public id!: string;
    public name!: string;
    public type!: string;
    public price!: number;
    public bookingFee!: number;
    public availability!: string;
    public eventId!: string;

    public static associate(models: { Event: typeof Event }): void {
        Ticket.belongsTo(models.Event, {foreignKey: 'eventId', as: 'event'});
    }
}

Ticket.init(
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
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        bookingFee: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        availability: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'tickets',
    }
);

export default Ticket;
