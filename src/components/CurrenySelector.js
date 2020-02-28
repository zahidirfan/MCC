import React, {Component} from 'react'
import CurrencyInput from './CurrencyInput'

export default class CurrencySelector extends Component{
   
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
        this.toSelectHandler = this.toSelectHandler.bind(this);
        this.fromSelectHandler = this.fromSelectHandler.bind(this);
        this.updaterate = this.updaterate.bind(this);
        
    }

    toChangeHandler(value){
        this.setState({
            to_value : value,
            from_value: value/ this.state.rate
        });
        console.log(this.state.rate)
        console.log(this.state.to_value)
        console.log(this.state.from_value)
    }
    fromChangeHandler(value){
        this.setState({
            from_value : value,
            to_value : value * this.state.rate
        });
        console.log(this.state.rate)
        console.log(this.state.to_value)
        console.log(this.state.from_value)
    }

    toSelectHandler(value){
        this.setState({
            to_currency :value
        });
        this.updaterate('to')       
    }

    fromSelectHandler(value){
        this.setState({
            from_currency :value
        });
        this.updaterate('from')
    }

    updaterate(change){
        fetch('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+this.state.from_currency+'&to_currency='+this.state.to_currency+'&apikey=W6EUZ830QDDV6CBE')
        .then(response => response.json())
        .then(json => {
            this.setState({
                        rate :json['Realtime Currency Exchange Rate']['5. Exchange Rate']

                    });
                    if(change == 'to'){
                        this.toChangeHandler(this.state.to_value)
                        }
                        else{
                        this.fromChangeHandler(this.state.from_value)
                        }
                })
        
    
    }
  render() {
    return (
        <div>
            <CurrencyInput label='From Currency' currency= {this.state.from_currency} value= {this.state.from_value} changeHandler={this.fromChangeHandler} selectHandler={this.fromSelectHandler}></CurrencyInput>
            <CurrencyInput label='To Currency' currency={this.state.to_currency} value= {this.state.to_value} changeHandler={this.toChangeHandler} selectHandler={this.toSelectHandler}></CurrencyInput>
        </div>
    )
  }
}