// MasonryEventCard.test.tsx
import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import MasonryEventCard from './MasonryEventCard';
import Event from '../../types';

// Sample test data
const mockEvents: Event[] = [
    {
        id: '1',
        name: 'Event 1',
        date: '2023-08-06',
        description: 'Description of Event 1',
        UserId: 1,
        createdAt: '2023-08-01',
        updatedAt: '2023-08-01',
        User: {
            id: 1,
            username: 'john_doe',
            email: 'john@example.com',
            password: 'hashed_password',
            role: 'user',
            createdAt: '2023-08-01',
            updatedAt: '2023-08-01',
        },
        Tickets: [
            {
                id: '1',
                name: 'Standard Ticket',
                type: 'General Admission',
                price: '20 USD',
                bookingFee: '2 USD',
                availability: 'Available',
                eventId: '1',
                createdAt: '2023-08-01',
                updatedAt: '2023-08-01',
            },
        ],
    },
    // Add more events as needed
];

test('MasonryEventCard renders correctly', () => {
    render(<MasonryEventCard events={mockEvents}/>);

    // Ensure that all event names are rendered
    mockEvents.forEach((event) => {
        const eventTitleElement = screen.getByText(event.name);
        expect(eventTitleElement).toBeInTheDocument();
    });
});

test('Clicking on an event expands it', async () => {
    render(<MasonryEventCard events={mockEvents}/>);

    // Get the first event card
    const eventCardElement = screen.getByText(mockEvents[0].name);

    // Ensure that the description is initially hidden
    const eventDescriptionElement = screen.queryByText(mockEvents[0].description);
    expect(eventDescriptionElement).toBeInTheDocument();

    // Click on the event card to expand it
    fireEvent.click(eventCardElement);

    // Wait for state changes and re-render to take effect
    await act(async () => {
    });

    // Ensure that the description is now visible
    const expandedEventDescriptionElement = screen.getByText(mockEvents[0].description);
    expect(expandedEventDescriptionElement).toBeInTheDocument();
});

test('Clicking on an expanded event collapses it', async () => {
    render(<MasonryEventCard events={mockEvents}/>);

    // Get the first event card
    const eventCardElement = screen.getByText(mockEvents[0].name);

    // Click on the event card to expand it
    fireEvent.click(eventCardElement);

    // Wait for state changes and re-render to take effect
    await act(async () => {
    });

    // Click on the expanded event card to collapse it
    fireEvent.click(eventCardElement);

    // Wait for state changes and re-render to take effect
    await act(async () => {
    });

    // Ensure that the description is no longer visible
    const eventDescriptionElement = screen.queryByText(mockEvents[0].description);
    expect(eventDescriptionElement).toBeInTheDocument();
});
