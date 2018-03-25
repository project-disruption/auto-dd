import React from "react";
import moment from "moment";
import request from 'superagent'
import TimeSeriesPlot from "./TimeSeriesPlot";

export default class IncomeByMonthTimePlot extends React.Component {
  state = {
    incomeByMonth: [],
    fromDate: moment().subtract(1, "years").format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),
    line: 'Income'

  };
  componentDidMount () {
    this.getData()
  }
  getData = () => {
    const { fromDate, toDate, line } = this.state
    request.get('/profitandlossbyline')
      .query({ fromDate, toDate, line })
      .then((response) => {
        this.setState({ incomeByMonth: response.body })
      })

  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input name="fromDate" type="text" value={this.state.fromDate} onChange={this.handleChange}/>
        <input name="toDate" type="text" value={this.state.toDate} onChange={this.handleChange}/>
        <button onClick={this.getData}>Submit</button>
        <TimeSeriesPlot
          data={this.state.incomeByMonth}
          height={800}
          margin={100}
          selectX={datum => moment(datum.date).toDate()}
          selectY={datum => datum.value}
          width={800}
          setTooltip={this.setTooltip}
        />
      </div>
    );
  }
}
