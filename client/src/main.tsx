import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app/layout/styles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { router } from './app/routes/Routes.tsx';
import { store } from './app/store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
