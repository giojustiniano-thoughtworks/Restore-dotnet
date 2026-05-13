import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { DarkMode, LightMode, ShoppingCart } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleDarkMode } from './uiSlice';

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },
] as const;

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
] as const;

const navStyles = {
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500',
    },
    '&.active': {
        color: '#baecf9',
    },
    color: 'inherit',
    typography: 'h6',
} as const;

export default function NavBar() {
    const dispatch = useAppDispatch();
    const { isLoading, darkMode } = useAppSelector(state => state.ui);

    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        component={NavLink}
                        to="/"
                        variant="h6"
                        sx={navStyles}
                    >
                        RE-STORE
                    </Typography>

                    <IconButton onClick={() => dispatch(toggleDarkMode())}>
                        {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
                    </IconButton>
                </Box>

                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            key={path}
                            to={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton size='large' sx={{ color: 'inherit' }}>
                        <Badge badgeContent={4} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                key={path}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>

            {isLoading && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress color='secondary' />
                </Box>
            )}
        </AppBar>
    );
}