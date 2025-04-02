import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { StoresProvider } from './contexts/StoresContext.jsx';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <StoresProvider>
          <App />
        </StoresProvider>
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>,
);