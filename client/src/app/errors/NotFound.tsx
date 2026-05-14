import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SearchOff } from '@mui/icons-material';

export default function NotFound() {
    return (
        <Paper
            sx={{
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 6,
            }}
        >
            <SearchOff
                sx={{
                    fontSize: 100,
                }}
                color="primary"
            />
            <Typography gutterBottom variant="h3" component="h2">
                Oops - we couldn't find what you were looking for
            </Typography>

            <Button fullWidth component={Link} to="/catalog">
                Go to Catalog
            </Button>
        </Paper>
    );
};