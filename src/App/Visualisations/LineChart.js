import React from 'react'
import {LineChart, XAxis, YAxis, Tooltip, Line, Legend} from 'recharts'

export default class LineChartPlot extends React.Component {
  render () {
      const data = this.props.data
  return (
    <div>
        <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis  tickFormatter={(value) => `$${value}`}/>
            <Tooltip formatter={(value) => `$${value}`}/>
            <Line stroke="#06ab12" type="monotone" dataKey={d => d["Total Income"]} />
            <Line stroke="#d1c309" type="monotone" dataKey={d => d["Net Profit"]} />
        </LineChart>
    </div>
  );
  }
}
