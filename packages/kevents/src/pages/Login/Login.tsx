import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, TextField, Typography} from '@mui/material';
import * as yup from 'yup';
import {useAuth} from "../../context/login";

interface LoginData {
    email: string;
    password: string;
}

const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email format.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
});

export const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {login} = useAuth();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginData>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        try {
            const user = await login(data);
            if (user) {
                setSuccessMessage('Login successful!');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in. Please check your credentials.');
        }
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Login
            </Typography>
            {successMessage &&
                <Typography variant="body1" align="center" color="success.main">{successMessage}</Typography>}
            {errorMessage && <Typography variant="body1" align="center" color="error.main">{errorMessage}</Typography>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register('password')}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Button sx={{height: 50}} size="large" type="submit"  variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
