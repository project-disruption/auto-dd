import React, { Component } from 'react'
import './App.css';
import {Route, Link} from  'react-router-dom'
import InvoicesTimePlot from './Visualisations/InvoicesTimePlot'
import IncomeByMonthTimePlot from './Visualisations/IncomeByMonthTimePlot'
import Main from './Main'
import Header from './Header'
import moment from 'moment'

class App extends Component {

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
        <Link to="/">Home</Link>
        <Link to="/invoices">Invoices</Link>
        <Link to="/incomebymonth">Income By Month</Link>
        <Route exact path="/" component={Main} />
        <Route path="/invoices" component={InvoicesTimePlot} />
        <Route path="/incomebymonth" component={IncomeByMonthTimePlot} />

      </div>
    );
  }
}

export default App;
