import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import AuthProvider from './contexts/AuthContext.jsx';

import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
)
