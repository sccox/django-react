import React, { useContext, useEffect, useCallback } from 'react';
import { Avatar, Box, Container, Button, Typography } from '@mui/material';

import GoogleIcon from '../../assets/google_fav.webp';
import AuthContext from '../../auth/context/AuthContext';
const REACT_APP_GOOGLE_CLIENT_ID ='';
const redirectUri = 'callback';
let REACT_APP_BASE_BACKEND_URL = 'http://localhost:3000';
// if (process.env.REACT_APP_STAGE === 'staging') {
//     REACT_APP_BASE_BACKEND_URL =
//         '';
// } else if (process.env.REACT_APP_STAGE === 'production') {
//     REACT_APP_BASE_BACKEND_URL = '';
// } else {
    

function LoginPage() {
    const { loginUser } = useContext(AuthContext);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (code) {
            loginUser(code);
        }
    }, [code, loginUser]);

    const openGoogleLoginPage = useCallback(() => {
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        const scope = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ].join(' ');

        const params = {
            response_type: 'code',
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: `${REACT_APP_BASE_BACKEND_URL}/${redirectUri}`,
            prompt: 'select_account',
            access_type: 'online',
            scope,
        };

        const urlParams = new URLSearchParams(params).toString();

        window.location = `${googleAuthUrl}?${urlParams}`;
    }, []);

    return (
        <Container>
            <Box
                sx={{
                    marginTop: '30%',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h3" sx={{ mb: 8 }}>
                    Welcome to Django-React Demo
                </Typography>
                <Button
                    color="white"
                    variant="outlined"
                    size="large"
                    onClick={openGoogleLoginPage}
                    endIcon={
                        <Avatar
                            src={GoogleIcon}
                            sx={{ width: 25, height: 25 }}
                        />
                    }
                >
                    
                </Button>
            </Box>
        </Container>
    );
}

export default LoginPage;
