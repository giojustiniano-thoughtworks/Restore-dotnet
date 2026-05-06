import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

interface Props {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export default function NavBar({darkMode, toggleDarkMode}: Props) {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="h1">
                    RE-STORE
                </Typography>

                <IconButton onClick={toggleDarkMode}>
                    {darkMode ? <DarkMode /> : <LightMode sx={{color: 'yellow'}} />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}