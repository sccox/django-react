import React, { useContext, useEffect } from 'react';
import { Box, Container } from '@mui/material';

import AuthContext from '../../auth/context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

function StageLogin() {
    const { loginUser } = useContext(AuthContext);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    useEffect(() => {
        if (code) {
            loginUser(code);
        }
    }, [code, loginUser]);
    return (
        <Container>
            <Box
                sx={{
                    marginTop: '33%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <CircularProgress size="4rem" />
            </Box>
        </Container>
    );
}

export default StageLogin;
