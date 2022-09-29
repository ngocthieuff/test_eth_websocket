import React from 'react';
import './App.css';
import { PriceProvider } from './context/PriceContext';
import HomePage from './pages/HomePage';

function App() {
  return (
      <PriceProvider>
          <HomePage />
      </PriceProvider>
  );
}

export default App;
