import {act, render} from '@testing-library/react';
import {login as loginApi} from '../utils';
import {AuthProvider, useAuth} from "./login";

jest.mock('../utils/api');

describe('AuthProvider', () => {
    it('provides an auth context with login and logout functions', () => {
        let authContext: ReturnType<typeof useAuth> | undefined;
        const TestComponent = () => {
            authContext = useAuth();
            return null;
        };

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        expect(authContext).toMatchObject({
            user: expect.any(Object),
            login: expect.any(Function),
            logout: expect.any(Function),
        });
    });

    it('logs in a user and updates the user context', async () => {
        const userData = {token: 'fake-token', username: 'TestUser'};
        (loginApi as jest.Mock).mockResolvedValue(userData);

        let authContext: ReturnType<typeof useAuth> | undefined;
        const TestComponent = () => {
            authContext = useAuth();
            return null;
        };

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        await act(async () => {
            await authContext!.login({email: 'test@test.com', password: 'test'});
        });

        expect(authContext!.user).toEqual({loggedIn: true, username: userData.username});
    });

    it('logs out a user and updates the user context', () => {
        let authContext: ReturnType<typeof useAuth> | undefined;
        const TestComponent = () => {
            authContext = useAuth();
            return null;
        };

        render(
            <AuthProvider>
                <TestComponent/>
            </AuthProvider>
        );

        act(() => {
            authContext!.logout();
        });

        expect(authContext!.user).toBe(null);
    });
});
