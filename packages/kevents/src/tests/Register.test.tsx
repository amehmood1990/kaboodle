import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Register } from '../pages/Register/Register';
import { createUser } from '../utils';

// Mock the createUser function
jest.mock('../../utils/api', () => ({
    createUser: jest.fn(),
}));

describe('Register', () => {
    test('renders Register component and submits form', async () => {
        const mockData = {
            username: 'TestUser',
            email: 'testuser@example.com',
            password: 'TestPassword123',
        };

        (createUser as jest.MockedFunction<typeof createUser>).mockResolvedValueOnce(mockData);

        const { getByLabelText, getByRole } = render(<Register />);

        // Fill the form
        fireEvent.change(getByLabelText(/username/i), { target: { value: mockData.username } });
        fireEvent.change(getByLabelText(/email/i), { target: { value: mockData.email } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: mockData.password } });

        // Submit the form
        fireEvent.click(getByRole('button', { name: /register/i }));

        // Assert createUser is called with correct data
        await waitFor(() =>
            expect(createUser).toHaveBeenCalledWith(mockData),
        );
    });
});
