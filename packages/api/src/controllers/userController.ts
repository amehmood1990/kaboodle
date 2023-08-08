import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from "jsonwebtoken";

// Controller to create a new user
export const createUser = async (req: Request, res: Response) => {
    const {username, email, password, role = 'user'} = req.body;

    // Check that required fields are provided
    if (!username || !email || !password) {
        return res.status(400).json({error: 'Username, email, and password are required.'});
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            return res.status(409).json({error: 'User with this email already exists.'});
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password: hashedPassword, role});

        return res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({error: 'Unable to create the user.'});
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    // Check that email and password are provided
    if (!email || !password) {
        return res.status(400).json({error: 'Email and password are required.'});
    }

    try {
        // Find user by email
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({error: 'User not found.'});
        }

        // Compare input password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid password.'});
        }

        // As an example, if you're using JWT-based authentication:
        const token = jwt.sign({userId: user.id}, `${process.env.JWT_SECRET}`, {expiresIn: '1h'});
        res.cookie('token', jwt, {httpOnly: true});

        return res.json({message: 'User authenticated successfully.', token, username: user.username});

    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({error: 'Unable to log in the user.'});
    }
};
// Controller to get all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({error: 'Unable to fetch users.'});
    }
};

// Controller to get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: 'User not found.'});
        }

        return res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({error: 'Unable to fetch the user.'});
    }
};

// Controller to update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {username, email, password, role} = req.body;

    if (!username || !email || !role) {
        return res.status(400).json({error: 'Username, email, and role are required.'});
    }

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: 'User not found.'});
        }

        // Update user details
        user.username = username;
        user.email = email;
        user.role = role;

        // Update password if provided
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({error: 'Unable to update the user.'});
    }
};

// Controller to delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({error: 'User not found.'});
        }

        await user.destroy();

        return res.json({message: 'User deleted successfully.'});
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({error: 'Unable to delete the user.'});
    }
};
