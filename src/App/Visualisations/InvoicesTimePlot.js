import React from "react";
import moment from 'moment'
import request from 'superagent'
import TimeSeriesPlot from "./TimeSeriesPlot";

export default class InvoicesTimePlot extends React.Component {
  state = {
    invoices: []
  };

  componentWillMount() {
    request.get("/invoices").then(response => {
      this.setState({ invoices: response.body });
    });
  }

  render() {
    return (
      <TimeSeriesPlot
        data={this.state.invoices}
        height={800}
        margin={100}
        selectX={datum => moment(datum.Date).toDate()}
        selectY={datum => datum.Total}
        width={800}
        setTooltip={this.setTooltip}
      />
    );
  }
}
