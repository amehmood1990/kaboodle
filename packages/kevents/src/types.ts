// src/types.ts

interface Ticket {
    id: string;
    name: string;
    type: string;
    price: string;
    bookingFee: string;
    availability: "Sold Out" | "Available";
    eventId: string;
    createdAt: string;
    updatedAt: string;
}

interface Event {
    id: string;
    name: string;
    date: string;
    description: string;
    UserId: number;
    createdAt: string;
    updatedAt: string;
    User: User;
    Tickets: Ticket[];
}


interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt: string;
    updatedAt: string;
}

export default Event;
