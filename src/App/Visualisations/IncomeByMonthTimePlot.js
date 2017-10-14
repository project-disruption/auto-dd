import React from "react";
import moment from "moment";
import request from 'superagent'
import TimeSeriesPlot from "./TimeSeriesPlot";

export default class IncomeByMonthTimePlot extends React.Component {
  state = {
    incomeByMonth: []
  };
  componentDidMount () {
    request.get('/profitandlossbyline?fromDate=2016-09-01&toDate=2017-03-31&line=Income')
      .then((response) => {
        this.setState({ incomeByMonth: response.body })
      })
  }
  render() {
    return (
      <TimeSeriesPlot
        data={this.state.incomeByMonth}
        height={800}
        margin={100}
        selectX={datum => moment(datum.date).toDate()}
        selectY={datum => datum.value}
        width={800}
        setTooltip={this.setTooltip}
      />
    );
  }
}
