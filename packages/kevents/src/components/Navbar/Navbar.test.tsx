import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar, {IUser} from './Navbar';
import {BrowserRouter as Router} from 'react-router-dom';

describe('Navbar component', () => {
    const dummyUser: IUser | null = {
        loggedIn: true,
        username: 'testuser',
    };

    const dummyLogout = jest.fn();

    const renderComponent = (user: IUser | null, logout: any) => {
        return render(
            <Router>
                <Navbar user={user} logout={logout}/>
            </Router>
        );
    };

    test('renders login and register buttons when user is not logged in', () => {
        renderComponent(null, dummyLogout);

        const loginButton = screen.getByText('Login');
        const registerButton = screen.getByText('Register');

        expect(loginButton).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    // ... (other test code)

    test('renders account menu and logout button when user is logged in', () => {
        renderComponent(dummyUser, dummyLogout);

        const accountButton = screen.getByRole('button', {name: /account of current user/i});
        fireEvent.click(accountButton); // Open the menu

        const profileMenuItem = screen.getByText('Profile');
        const eventsMenuItem = screen.getByText('Events');
        const ticketsMenuItem = screen.getByText('Tickets');
        const logoutButton = screen.getByText('Logout');

        expect(profileMenuItem).toBeInTheDocument();
        expect(eventsMenuItem).toBeInTheDocument();
        expect(ticketsMenuItem).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
    });

    test('calls logout function when logout button is clicked', () => {
        renderComponent(dummyUser, dummyLogout);

        const logoutButton = screen.getByText('Logout');

        // Clicking the logout button should trigger the dummyLogout function
        userEvent.click(logoutButton);

        expect(dummyLogout).toHaveBeenCalled();
    });
});
