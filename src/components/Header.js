import React from 'react';

export default function Header(props) {
  return (
    <div className='jumbotron'>
      <h1> Mezino Currency {props.name}</h1>
      <p>MCC helps you convert from one currency to another</p>
    </div>
  );
}