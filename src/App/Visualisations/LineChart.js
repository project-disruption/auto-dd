import React from 'react'
import {LineChart, XAxis, YAxis, Tooltip, Line, Legend, ReferenceLine} from 'recharts'

export default class LineChartPlot extends React.Component {
  render () {
      const data = this.props.data
  return (
    <div>
        <LineChart width={700} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis  tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => `$${value}`}/>
            <Legend />
            <ReferenceLine y="0" stroke="gray" strokeDasharray="3 3"/>
            <Line stroke="#06ab12" type="monotone" dataKey={"Total Income"} />
            <Line stroke="#d1c309" type="monotone" dataKey={"Net Profit"} />
            <Line stroke="#ed550b" type="monotone" dataKey={"Total Operating Expenses"} />

        </LineChart>
    </div>
  );
  }
}
