import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import request from 'superagent'

class App extends Component {

  state = {
    invoices: []
  }

  componentDidMount () {
    request.get('http://localhost:3001/invoices')
      .then((response) => {
        this.setState({ invoices: response.body })
      })
  }

  render() {
    const title = 'Auto DD'
    return (
      <div className="App">
        <Header title={title}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.invoices.map((invoice) => {
          return (
            <div key={invoice.InvoiceID}>
              <p>Type: {invoice.Type}</p>
              <p>Total: {invoice.Total}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
