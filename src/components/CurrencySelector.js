import React, { Component } from 'react'

import CurrencyInput from './CurrencyInput'

export default class Currency extends Component {

    constructor (props){
        super(props)

        this.state = {
            to_currency : 'USD',
            from_currency : 'PKR',
            to_value : '',
            from_value :100,
            rate : 100
        }

        this.toChangeHandler = this.toChangeHandler.bind(this);
        this.fromChangeHandler = this.fromChangeHandler.bind(this);
        this.toCurrencyHandler = this.toCurrencyHandler.bind(this);
        this.fromCurrencyHandler = this.fromCurrencyHandler.bind(this);
        this.callApi = this.callApi.bind(this);
        this.changeRate = this.changeRate.bind(this);

        this.callApi('from');
    }

    callApi(handler){
        fetch("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="
        +this.state.from_currency+"&to_currency="+this.state.to_currency+"&apikey=CZ2Y7RO5LHTWH41I")
        .then((response) => response.json())
        .then(json => this.changeRate(json['Realtime Currency Exchange Rate']['5. Exchange Rate'], handler))
    }

    changeRate(newRate, handler){
        this.setState({
            rate: newRate
        }, handler == 'from' ? () => this.fromChangeHandler(this.state.from_value) : () => this.toChangeHandler(this.state.to_value)
        );
        
    }

    toChangeHandler(value){        
        this.setState({
            to_value : value,
            from_value: value/ this.state.rate
        });
    }
    fromChangeHandler(value){
        this.setState({
            from_value : value,
            to_value : value * this.state.rate
        });
    }

    toCurrencyHandler(value){
        this.setState({
            to_currency: value
        }, () => this.callApi('to')
        );
    }

    fromCurrencyHandler(value){
        this.setState({
            from_currency : value
        }, () => this.callApi('from')
        );
    }

  render() {
    return (
        <div>
            <CurrencyInput 
                label='From Currency' 
                currency={this.state.from_currency}
                value={this.state.from_value} 
                changeCurrency={this.fromCurrencyHandler}
                changeHandler={this.fromChangeHandler}
                >
            </CurrencyInput>

            <CurrencyInput 
                label='To Currency' 
                currency={this.state.to_currency} 
                value={this.state.to_value} 
                changeCurrency={this.toCurrencyHandler}
                changeHandler={this.toChangeHandler}
                >
            </CurrencyInput>
        </div>
    )
  }
}
