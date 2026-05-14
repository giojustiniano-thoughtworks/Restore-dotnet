import { Divider, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ServerError() {
    const { state } = useLocation();

    return (
        <Paper>
            {state?.error ? (
                <>
                    <Typography gutterBottom variant="h3" component="h2" sx={{ px: 4, pt: 2 }} color="secondary">
                        {state.error.title || 'Server Error'}
                    </Typography>

                    <Divider />

                    <Typography variant="body1" sx={{ p: 4 }}>
                        {state.error.detail || 'An unexpected error occurred.'}
                    </Typography>
                </>
            ) : (
                <Typography gutterBottom variant="h5" component="h2">
                    Server Error
                </Typography>
            )}
        </Paper>
    );
}