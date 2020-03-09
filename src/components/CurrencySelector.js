import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
import CurrencyInput from './CurrencyInput'

export default class Currency extends Component {

    constructor (props){
        super(props)

        this.state = {
            to_currency : 'JPY',
            from_currency : 'USD',
            to_value : 0,
            from_value : 0,
            rate : 100,
            loading_status : "api is fetching data"
        }

        this.fetchExchangeRates = this.fetchExchangeRates.bind(this);
        this.toChangeHandler = this.toChangeHandler.bind(this);
        this.fromChangeHandler = this.fromChangeHandler.bind(this);
        this.toDropDownHandler = this.toDropDownHandler.bind(this);
        this.fromDropDownHandler = this.fromDropDownHandler.bind(this);
    }

    fetchExchangeRates(){
        let api_url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+this.state.from_currency+"&to_currency="+this.state.to_currency+"&apikey=W6EUZ830QDDV6CBE"
        fetch(api_url)
        .then(response => response.json())
        .then(data => {
            let currency_data = data["Realtime Currency Exchange Rate"]
            this.setState({
            rate : currency_data["5. Exchange Rate"],
            loading_status: "data fetched"})
        })
        .catch(error => this.setState({ error, loading_status: "data couldnt be fetched" }));
    }

    componentWillMount(){
        this.fetchExchangeRates();
        
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
    fromDropDownHandler(value){
        console.log("from handler: " + value)
        this.setState({from_currency: value, loading_status : "api is fetching data" },
         () => this.fetchExchangeRates())
        this.fromChangeHandler(this.state.from_value)
    }
    toDropDownHandler(value){
        console.log("to handler: " + value)
        this.setState({to_currency: value, loading_status : "api is fetching data"},
            () => this.fetchExchangeRates());
        this.toChangeHandler(this.state.to_value)
        
    }
  render() {
    return (
        <div>
            <CurrencyInput label='From Currency' 
                currency= {this.state.from_currency}
                value= {this.state.from_value} 
                changeHandler={this.fromChangeHandler} 
                dropDownHandler={this.fromDropDownHandler}></CurrencyInput>
            
            <CurrencyInput label='To Currency' 
                currency={this.state.to_currency} 
                value= {this.state.to_value} 
                changeHandler={this.toChangeHandler} 
                dropDownHandler={this.toDropDownHandler}></CurrencyInput>
            <Alert key='info' variant='info'>
                Status: {this.state.loading_status}
            </Alert>
        </div>
    )
  }
}
