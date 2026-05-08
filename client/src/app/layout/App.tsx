import { useState } from 'react';
import { Box, Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

function App() {
  const [darkMode, setDarkMode] = useState(true);

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

  const toggleDarkMode = () => {
    setDarkMode(prevState => !prevState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

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
