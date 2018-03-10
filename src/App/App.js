import React, { Component } from 'react'
import './App.css';
import {Route, Link} from  'react-router-dom'
import InvoicesTimePlot from './Visualisations/InvoicesTimePlot'
import IncomeByMonthTimePlot from './Visualisations/IncomeByMonthTimePlot'
import PnlByLine from './Visualisations/PnLByLine'
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
        <Link to="/pnlbyline">PnL By Line</Link>
        <Route exact path="/" component={Main} />
        <Route path="/invoices" component={InvoicesTimePlot} />
        <Route path="/incomebymonth" component={IncomeByMonthTimePlot} />
        <Route path="/pnlbyline" component={PnlByLine} />
      </div>
    );
  }
}

export default App;
