import React from 'react'

export default function CurrencyInput(props) {
    const currencies = ['USD', 'PKR', 'UKP'];
    let i=0;

    return (
        <div>
            <label> <strong>{props.label}</strong> </label>
                <input type='number' value={props.value} onChange={(e)=> props.changeHandler(e.target.value)}></input>
                <select defaultValue= {props.currency}>
                    {currencies.map ((item)=> <option key={i++} >{item}</option> )}                
                </select>
        </div>
    )
}
