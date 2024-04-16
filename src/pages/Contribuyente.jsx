import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';


import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Contribuyente() {
    return (
        <Box>

            {/* the app bar */}
            <AppBar sx={{ position: 'fixed'}}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/user')}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {'Contribuyente'}
                </Typography>
                </Toolbar>
            </AppBar>



        </Box>
    )
}