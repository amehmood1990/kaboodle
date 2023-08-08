import React from 'react';
import {render, screen} from '@testing-library/react';
import {fetchEvents} from "../utils";
import LandingPage from "../pages/LandingPage/LandingPage";

jest.mock("../../utils/api");

describe('LandingPage', () => {
    const mockEvents = [
        {id: 1, name: 'Mock Event 1'},
        {id: 2, name: 'Mock Event 2'}
    ];

    beforeEach(() => {
        (fetchEvents as jest.Mock).mockResolvedValue(mockEvents);
    });

    test('renders LandingPage component with title', async () => {
        render(<LandingPage/>);
        expect(screen.getByText("LATEST EVENTS")).toBeInTheDocument();
    });

});
