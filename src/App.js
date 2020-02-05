import React from 'react';
import './App.css';
import Header from './components/Header';
import CurrencySelector from './components/CurrencySelector';

function App() {

  return (
    <div className="App">
      <Header name='Convertor'> </Header>
      <CurrencySelector></CurrencySelector>
    </div>
  );
}

export default App;
