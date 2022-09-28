import React from 'react';
import './App.css';
import { HomePage } from './pages/HomePage';
import { PriceProvider } from './context/PriceContext';

function App() {
  return (
    <PriceProvider>
      <HomePage />
    </PriceProvider>
  );
}

export default App;
