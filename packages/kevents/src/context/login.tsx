import React, {createContext, useContext, useEffect, useState} from 'react';
import {login as loginApi} from '../utils';

interface User {
    loggedIn: boolean;
    username?: any
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthContextProps {
    user: User | null;
    login: (data: LoginData) => Promise<any>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

interface IProps {
    children?: any
}

export const AuthProvider: React.FC<IProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        const username = localStorage.getItem('username');

        if (jwt) {
            setUser({loggedIn: true, username});
        }
    }, []);

    const login = async (data: LoginData) => {
        try {
            const loggedInUser = await loginApi(data);
            if (loggedInUser) {
                localStorage.setItem('jwt', loggedInUser?.token);
                localStorage.setItem('username', loggedInUser?.username || '');
                setUser({loggedIn: true, username: loggedInUser?.username});
                return loggedInUser;
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
