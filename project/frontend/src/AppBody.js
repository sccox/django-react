import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Container from '@mui/material/Container';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';

import PrimarySearchAppBar from './components/layout/PrimarySearchAppBar';

import { createBrowserHistory } from 'history';
import HomePage from './pages/HomePage';
import { AuthProvider } from './auth/context/AuthContext';
import AppDrawer from './components/layout/AppDrawer';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function AppBody() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const history = createBrowserHistory();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <PrimarySearchAppBar
                    open={open}
                    handleDrawerOpen={handleDrawerOpen}
                />
            </AppBar>
            {/* <AppDrawer open={open} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} /> */}

            <Container
                aria-label="Page Content"
                sx={{ p: 0, m: '0 auto', mt: 12, width: '90%' }}
                maxWidth={false}
            >
                <AuthProvider>
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                    </Routes>
                </AuthProvider>
            </Container>
        </Box>
    );
}
