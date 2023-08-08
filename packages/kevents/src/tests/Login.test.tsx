import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Login} from "../pages/Login/Login";
import {useAuth} from "../context/login";

// Mock the useAuth hook
jest.mock("../../context/login");

describe('Login', () => {
    const loginMock = jest.fn();

    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            login: loginMock,
        });
    });

    test('submits form with email and password', async () => {
        render(<Login/>);

        fireEvent.input(screen.getByLabelText("Email"), {
            target: {value: 'test@example.com'},
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith({email: 'test@example.com', password: 'password123'});
        });
    });

    test('displays success message on successful login', async () => {
        loginMock.mockResolvedValue(true);

        render(<Login/>);

        fireEvent.input(screen.getByLabelText("Email"), {
            target: {value: 'test@example.com'},
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(screen.getByText("Login successful!")).toBeInTheDocument();
        });
    });

    test('displays error message on failed login', async () => {
        loginMock.mockRejectedValue(new Error());

        render(<Login/>);

        fireEvent.input(screen.getByLabelText("Email"), {
            target: {value: 'test@example.com'},
        });
        fireEvent.input(screen.getByLabelText("Password"), {
            target: {value: 'password123'},
        });

        fireEvent.click(screen.getByRole("button", { name: "Login" }));

        await waitFor(() => {
            expect(screen.getByText("Error logging in. Please check your credentials.")).toBeInTheDocument();
        });
    });
});
