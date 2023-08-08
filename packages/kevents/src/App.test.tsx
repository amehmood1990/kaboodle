import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from './context/login';
import App from './App';

jest.mock('./context/login');

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('App', () => {
    it('should ', () => {

    });
});
