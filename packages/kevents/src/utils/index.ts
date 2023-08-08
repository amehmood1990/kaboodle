// src/utils/api.ts
import Event from "../types";

const apiUrl = process.env.REACT_APP_API_URL;

interface User {
    username?: string;
    email?: string;
    password?: string;
    token?: any;
    // Add any other fields your user objects have
}

export const fetchEvents = async (): Promise<Event[]> => {
    try {
        const response = await fetch(`${apiUrl}/events`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        // Handle error here (e.g., log the error or display an error message)
        console.error('Error fetching events:', error);
        return [];
    }
};

export const createUser = async (userData: User): Promise<User | null> => {
    try {
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user: User = await response.json();
        return user;
    } catch (error) {
        console.error('Error occurred while creating user:', error);
        return null;
    }
};

export const login = async (userData: User): Promise<User | null> => {
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include', // This makes fetch send cookies
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const user: User = await response.json();
        return user;
    } catch (error) {
        console.error('Error occurred while logging in:', error);
        return null;
    }
};

// Consolidate user-specific events fetch
export const fetchUserEvents = async (userId?: string): Promise<Event[]> => {
    try {

        const url = apiUrl + "/users/" + (userId ? `${userId}/events` : 'events')
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getJwtToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        // Handle error here (e.g., log the error or display an error message)
        console.error('Error fetching user events:', error);
        return [];
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        const response = await fetch(`${apiUrl}/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`, // Add JWT token to the request headers
            },
        });

        if (!response.ok) {
            throw new Error('Error deleting event');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

function getJwtToken() {
    return localStorage.getItem('jwt');
}


