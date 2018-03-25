import React from "react";
import moment from "moment";
import request from 'superagent'
import TimeSeriesPlot from "./TimeSeriesPlot";
import LineChartPlot from "./LineChart";

export default class PnlByLine extends React.Component {
  state = {
    lineByMonth: [],
    fromDate: moment().endOf('month').subtract(1, "years").format("YYYY-MM-DD"),
    toDate: moment().endOf('month').format("YYYY-MM-DD"),
    line: 'Total Income'
  };
  // componentDidMount () {
  //   this.getData()
  // }
  getData = () => {
    const { fromDate, toDate, line } = this.state
    request.get('/profitandlossbyline')
      .query({ fromDate, toDate, line })
      .then((response) => {
        this.setState({ lineByMonth: response.body })
      })

  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    console.log(this.state.lineByMonth)
    return (
      <div>
        <input name="fromDate" type="text" value={this.state.fromDate} onChange={this.handleChange}/>
        <input name="toDate" type="text" value={this.state.toDate} onChange={this.handleChange}/>
        <button onClick={this.getData}>Submit</button>
        <LineChartPlot data={this.state.lineByMonth} />
      </div>
    );
  }
}
