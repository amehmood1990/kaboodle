import {createUser, fetchEvents, login,} from './index'; // Assuming this is the file that contains the functions

// Define the mock fetch function and its return value
const mockFetch = jest.fn();

// Mock the global.fetch function
(global as any).fetch = mockFetch;

describe('API functions', () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const jwtToken = 'dummyjwttoken';

    beforeEach(() => {
        // Mock the localStorage for JWT token retrieval
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(jwtToken);
        // Reset the mock for each test
        mockFetch.mockReset();
        // Mock console.error to suppress the output in tests
        jest.spyOn(console, 'error').mockImplementation(() => {
        });
    });

    // Test for fetchEvents function
    it('fetches events correctly', async () => {
        const mockEvents: any[] = [{id: '1', name: 'Event 1'}, {id: '2', name: 'Event 2'}];
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockEvents,
        } as Response);

        const events = await fetchEvents();

        expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/events`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        expect(events).toEqual(mockEvents);
    });

    // Test for createUser function
    it('creates a new user correctly', async () => {
        const userData: any = {username: 'testuser', email: 'test@test.com', password: 'testpassword'};
        const mockUser: any = {...userData, token: 'dummytoken'};
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        } as Response);

        const newUser = await createUser(userData);

        expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        expect(newUser).toEqual(mockUser);
    });

    // Test for login function
    it('logs in a user correctly', async () => {
        const userData: any = {username: 'testuser', password: 'testpassword'};
        const mockUser: any = {...userData, token: 'dummytoken'};
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        } as Response);

        const loggedInUser = await login(userData);

        expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });
        expect(loggedInUser).toEqual(mockUser);
    });

});
