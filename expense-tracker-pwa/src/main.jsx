import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ExpensesProvider } from './context/ExpensesContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ExpensesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ExpensesProvider>
    </SettingsProvider>
  </StrictMode>
);