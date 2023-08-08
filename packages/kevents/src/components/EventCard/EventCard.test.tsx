import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';;
// @ts-ignore
import {Event as EventType} from '../../types';
import EventCard from "./EventCard";
import {deleteEvent} from "../../utils";

jest.mock('../../utils/api', () => ({
    deleteEvent: jest.fn(),
}));

describe('EventCard', () => {
    const eventMock: EventType = {
        id: '1',
        name: 'Event Name',
        description: 'Event Description',
        date: '2023-08-06',
        User: {
            username: 'test',
        },
        Tickets: [],
    };

    beforeEach(() => {
        localStorage.setItem('username', 'test');
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('renders event card correctly', () => {
        const {getByText} = render(<EventCard event={eventMock} expanded={null}/>);

        expect(getByText('Event Name')).toBeInTheDocument();
        expect(getByText('Event Description')).toBeInTheDocument();
    });

    test('deletes event when delete button is clicked', async () => {
        // @ts-ignore
        (deleteEvent as jest.Mock)?.mockResolvedValueOnce();

        render(<EventCard event={eventMock} expanded={null}/>);

        const deleteButton = screen.queryByLabelText('delete event');
        expect(deleteButton).not.toBeNull();
        fireEvent.click(deleteButton as HTMLElement);

        const confirmButton = await waitFor(() => screen.getByText('Delete'));
        fireEvent.click(confirmButton);

        expect(deleteEvent).toHaveBeenCalledWith('1');
    });

    test('handles error when deletion fails', async () => {
        (deleteEvent as jest.Mock).mockRejectedValueOnce(new Error());

        render(<EventCard event={eventMock} expanded={null}/>);

        const deleteButton = screen.queryByLabelText('delete event');
        expect(deleteButton).not.toBeNull();
        fireEvent.click(deleteButton as HTMLElement);

        const confirmButton = await waitFor(() => screen.getByText('Delete'));
        fireEvent.click(confirmButton);

        expect(deleteEvent).toHaveBeenCalledWith('1');
    });
});
