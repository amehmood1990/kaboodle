import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
        mode: 'dark', // Enable dark mode
        primary: {
            main: '#313030', // Set your primary color here
        },
        background: {
            default: '#121212', // Set your default background color here
            paper: '#1e1e1e', // Set your paper background color here
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Set your default font family here
        // Add any other typography customizations as needed
    },
    // Add any other theme customizations as needed
});

// Enable responsive font sizes
const darkTheme = responsiveFontSizes(theme);

export default darkTheme;
