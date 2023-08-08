import React from 'react';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export interface IUser {
    loggedIn: boolean;
    username?: string | null;
}

export interface INavProps {
    user: IUser | null;
    logout: any
}

const Navbar: React.FC<INavProps> = ({user, logout}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary" sx={{flexGrow: 1}}>
            <Container maxWidth="lg">
                <Toolbar>
                    <Typography variant="h5" sx={{flexGrow: 1}}>
                        <Link style={{color: "#ffffff"}} to="/">Kaboodle</Link>
                    </Typography>
                    {!user?.loggedIn ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    ) : (
                        <>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{marginRight: 2}}>
                                {user?.username}
                            </Typography>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose} component={Link} to="/events">Events</MenuItem>
                                <MenuItem onClick={handleClose} component={Link} to="/">Tickets</MenuItem>
                            </Menu>
                            <Button color="inherit" component={Link} onClick={logout} to="/login">Logout</Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
