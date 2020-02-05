import React, { Component } from 'react'

import CurrencyInput from './CurrencyInput'

export default class Currency extends Component {

    constructor (props){
        super(props)

        this.state = {
            to_currency : 'USD',
            from_currency : 'PKR',
            to_value : 1000,
            from_value :10,
            rate : 100
        }

        this.toChangeHandler = this.toChangeHandler.bind(this);
        this.fromChangeHandler = this.fromChangeHandler.bind(this);
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

  render() {
    return (
        <div>
            <CurrencyInput label='From Currency' currency= {this.state.from_currency} value= {this.state.from_value} changeHandler={this.fromChangeHandler}></CurrencyInput>
            <CurrencyInput label='To Currency' currency={this.state.to_currency} value= {this.state.to_value} changeHandler={this.toChangeHandler}></CurrencyInput>
        </div>
    )
  }
}
