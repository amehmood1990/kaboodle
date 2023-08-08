import { render, screen } from '@testing-library/react';
import TicketCard from './Ticket';

const sampleTicket = {
    id: '1',
    name: 'Sample Ticket',
    type: 'General',
    price: '10',
    bookingFee: '2',
    availability: 'Available',
};

describe('TicketCard', () => {
    it('renders ticket details correctly', () => {
        render(<TicketCard ticket={sampleTicket} />);

        // Check if the ticket name and type are rendered correctly
        const nameTypeElement = screen.getByText(`${sampleTicket.name} (${sampleTicket.type})`);
        expect(nameTypeElement).toBeInTheDocument();

        // Check if the ticket price is rendered correctly
        const priceElement = screen.getByText(`Price: £${sampleTicket.price}`);
        expect(priceElement).toBeInTheDocument();

        // Check if the booking fee is rendered correctly
        const bookingFeeElement = screen.getByText(`+ Booking Fee: £${sampleTicket.bookingFee}`);
        expect(bookingFeeElement).toBeInTheDocument();

        // Check if the availability is rendered correctly and has the appropriate color
        const availabilityElement = screen.getByText('Availability:');
        expect(availabilityElement).toBeInTheDocument();
        const availabilitySpanElement = screen.getByText(sampleTicket.availability);
        expect(availabilitySpanElement).toBeInTheDocument();
        expect(availabilitySpanElement).toHaveStyle(
            `color: ${sampleTicket.availability === 'Available' ? 'rgb(76, 175, 80)' : 'red'}`
        );
    });
});
