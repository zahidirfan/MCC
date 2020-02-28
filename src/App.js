import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import CurrencySelector from './components/CurrenySelector'

function App() {
  const name='Calculator'
  return (
    <div className="App">
   
    <Header name={name}></Header>
    <CurrencySelector></CurrencySelector>


    </div>
  );
}

export default App;
