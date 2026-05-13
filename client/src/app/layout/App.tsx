import { Box, Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useAppSelector } from '../store/store';

function App() {
  const darkMode = useAppSelector(state => state.ui.darkMode);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: darkMode ? '#121212' : '#eaeaea',
      }
    }
  });

  const bodyBackground = `radial-gradient(circle, ${darkMode ? '#1e3eBa, #111B27' : '#baecf9, #f0f9ff'})`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Box sx={{
        minHeight: '100vh',
        // backgroundColor: 'background.default'
        background: bodyBackground,
        py: 6
      }}>
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
