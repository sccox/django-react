import { Box, Container, Typography } from '@mui/material';

function UnauthorizedPage() {
    return (
        <Container>
            <Box
                sx={{
                    marginTop: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h5"
                    marginRight={1}
                    style={{ color: '#4C4E52' }}
                >
                    SP3CT4TOR
                </Typography>
                <Typography
                    variant="body2"
                    marginRight={1}
                    style={{ color: '#4C4E52' }}
                >
                    Sorry, but you are not authorized.
                </Typography>
            </Box>
        </Container>
    );
}

export default UnauthorizedPage;
