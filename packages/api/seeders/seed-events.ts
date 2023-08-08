import bcrypt from 'bcryptjs';
import sequelize from '../src/config/sequelize';
import User from '../src/models/User';
import Event from '../src/models/Event';
import Ticket from '../src/models/Ticket';


const seedData = async () => {
    try {
        const hashedPassword1 = await bcrypt.hash('password1', 10);
        const hashedPassword2 = await bcrypt.hash('password2', 10);
        await sequelize.sync({ force: true });

        // Create default users
        const users = await User.bulkCreate([
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: hashedPassword1,
                role: 'admin',
            },
            {
                username: 'jane_smith',
                email: 'jane@example.com',
                password: hashedPassword2,
                role: 'user',
            },
        ]);

        // Helper function to generate random date
        const generateRandomDate = () => {
            const start = new Date(2023, 7, 1);
            const end = new Date(2023, 7, 31);
            const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            return randomDate.toISOString().slice(0, 10);
        };

        // Helper function to generate random ticket data
        const generateRandomTicket = (eventId: string) => {
            const ticketTypes = ['General Admission', 'VIP', 'Student Pass', 'Premium', 'Early Bird'];
            const availabilityOptions = ['Available', 'Sold Out', 'Limited', 'On Hold'];

            const randomTicketType = ticketTypes[Math.floor(Math.random() * ticketTypes.length)];
            const randomPrice = Math.floor(Math.random() * 50) + 10;
            const randomBookingFee = Math.random() * 5;
            const randomAvailability = availabilityOptions[Math.floor(Math.random() * availabilityOptions.length)];

            return {
                name: `Ticket ${Math.floor(Math.random() * 1000)}`,
                type: randomTicketType,
                price: randomPrice,
                bookingFee: randomBookingFee,
                availability: randomAvailability,
                eventId,
            };
        };

        const eventNames = ['Rock Concert', 'Jazz Festival', 'Art Exhibition', 'Tech Conference', 'Film Premiere', 'Food Fair', 'Literary Festival', 'Sport Championship', 'Stand-Up Comedy Night', 'Theatre Play'];
        const eventDescriptions = ['A celebration of rock music', 'Immerse in the best jazz tunes', 'Discover exciting new art', 'Catch up on the latest in tech', 'See the newest films before anyone else', 'Taste the best food from all over the world', 'Meet your favorite authors', 'See top athletes compete', 'Laugh your heart out with the best comedians', 'Experience the magic of live theatre'];

        // Generate 100 random events associated with users
        const events = [];
        for (let i = 0; i < 100; i++) {
            const eventName = eventNames[i % eventNames.length];
            const eventDescription = eventDescriptions[i % eventDescriptions.length];
            const event = await Event.create({
                name: `${eventName} ${i + 1}`,
                date: generateRandomDate(),
                description: `${eventDescription}. This is the ${i + 1}th edition.`,
                UserId: users[i % 2].id,
            });
            events.push(event);
        }

        // Generate random tickets associated with events
        const tickets = [];
        for (const event of events) {
            const numberOfTickets = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < numberOfTickets; i++) {
                const ticketData = generateRandomTicket(event.id);
                const ticket = await Ticket.create(ticketData);
                tickets.push(ticket);
            }
        }

        console.log('Seed data successfully inserted.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
