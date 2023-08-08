import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import {fetchUserEvents} from "../utils";
import UserEvents from "../pages/Events";

// Mock the API
jest.mock("../../utils/api");

describe('UserEvents', () => {

    test('renders UserEvents component with title', async () => {
        // Setup mock to return some data
        (fetchUserEvents as jest.Mock).mockResolvedValue([]);

        render(<UserEvents/>);

        // Assert that "Your Events" title is rendered
        expect(screen.getByText("Your Events")).toBeInTheDocument();

        // Wait for fetchUserEvents to resolve and then assert that "NO DATA!" is rendered
        await waitFor(() => {
            expect(screen.getByText("NO DATA!")).toBeInTheDocument();
        });
    });

});
