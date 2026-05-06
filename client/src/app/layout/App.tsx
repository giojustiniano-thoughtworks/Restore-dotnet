import { useEffect, useState } from 'react';
import type { Product } from '../models/product';
import { Box, Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import NavBar from './NavBar';

function App() {
  const [products, setProducts] = useState<Product[]>([
    // { id: 1, name: 'Product 1', price: 10.99 },
    // { id: 2, name: 'Product 2', price: 19.99 },
    // { id: 3, name: 'Product 3', price: 5.99 }
  ]);
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

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

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
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
