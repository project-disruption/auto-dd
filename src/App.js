import React, { Component } from 'react'
import './App.css';
import Header from './Header'
import request from 'superagent'
import TimeSeriesPlot from './TimeSeriesPlot'
import data from './data.json'
import moment from 'moment'

class App extends Component {

  state = {
    invoices: [],
    total: null,
    date: null
  }

  componentDidMount () {
    request.get('/invoices')
      .then((response) => {
        this.setState({ invoices: response.body })
      })
  }

  setTooltip = ({ total, date }) => {
    this.setState({
      total, date
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
        {/* {this.state.invoices.map((invoice) => {
          return (
            <div key={invoice.InvoiceID}>
              <p>Type: {moment(invoice.Date).format("YYYY-MM-DD")}</p>
            </div>
          )
        })} */}
        <p>{this.state.date}</p>
        <p>{this.state.total}</p>
        <TimeSeriesPlot 
          data={this.state.invoices}
          height={800}
          margin={20}
          selectX={datum => moment(datum.Date).toDate()}
          selectY={datum => datum.Total}
          width={1000}
          setTooltip={this.setTooltip}
        />
      </div>
    );
  }
}

export default App;
