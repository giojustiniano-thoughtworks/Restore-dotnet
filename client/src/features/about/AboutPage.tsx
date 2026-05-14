import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from '@mui/material';
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery
} from './errorApi';
import { useState } from 'react';

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const triggerError = (errorTrigger: typeof trigger400Error) => {
    errorTrigger().unwrap().catch(err => console.error('Error triggered:', err));
  };

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (err) {
      if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
        const errorArray = err.message.split(', ');
        setValidationErrors(errorArray);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3" component="h2">
        Errors for testing
      </Typography>

      <ButtonGroup fullWidth sx={{ gap: 2 }}>
        <Button variant="contained" onClick={() => triggerError(trigger400Error)}>Test 400 Error</Button>
        <Button variant="contained" onClick={() => triggerError(trigger401Error)}>Test 401 Error</Button>
        <Button variant="contained" onClick={() => triggerError(trigger404Error)}>Test 404 Error</Button>
        <Button variant="contained" onClick={() => triggerError(trigger500Error)}>Test 500 Error</Button>
        <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
      </ButtonGroup>

      {validationErrors.length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}

    </Container>
  );
}