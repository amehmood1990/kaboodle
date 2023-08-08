import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, TextField, Typography} from '@mui/material';
import * as yup from 'yup';
import {createUser} from '../../utils';

interface FormData {
    username: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required('USername is required.'),
    email: yup.string().email('Invalid email format.').required('Email is required.'),
    password: yup.string().required('Password is required.'),
});

export const Register: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createUser(data);
        } catch (error) {
            console.error('Error registering user:', error);
            // Handle registration error here
        }
    };

    return (
        <div>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    {...register('username')}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />
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
                <Button sx={{height: 50}} size="large" type="submit" variant="contained" color="primary" fullWidth>
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Register;
