import React from "react";
import {Route, Routes} from "react-router-dom";
import {Container, styled} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import LandingPage from "./pages/LandingPage/LandingPage";
import {useAuth} from "./context/login";
import UserEvents from "./pages/Events";

const RootContainer = styled(Container)(({theme}) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    minHeight: "100vh",
}));

const App = () => {
    const {user, logout} = useAuth();
    return (
        <div>
            <Navbar user={user || {loggedIn: false, username: null}} logout={logout}/>
            <RootContainer maxWidth="lg">
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/events" element={<UserEvents/>}/>
                    {
                        !user?.loggedIn && (
                            <>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                            </>
                        )
                    }
                </Routes>
            </RootContainer>
        </div>

    );
};

export default App;
