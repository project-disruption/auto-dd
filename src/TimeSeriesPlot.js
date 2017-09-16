import React from 'react'
import { extent as d3ArrayExtent } from 'd3-array';
import {
  scaleLinear as d3ScaleLinear,
  scaleTime as d3ScaleTime,
} from 'd3-scale';
import { line as d3Line } from 'd3-shape';
import {
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
} from 'd3-axis';
import tip from 'd3-tip'
import { select as d3Select } from 'd3-selection';
import SVGWithMargin from './svg';
import ReactTooltip from 'react-tooltip'
import './TimeSeriesPlot.css'

export default class TimeSeriesPlot extends React.Component {
  render () {
    const { data, height, selectX, selectY, width, margin } = this.props
    // Since this is "time series" visualization, our x axis should have a time scale.
    // Our x domain will be the extent ([min, max]) of x values (Dates) in our data set.
    // Our x range will be from x=0 to x=width.
    const xScale = d3ScaleTime()
    .domain(d3ArrayExtent(data, selectX))
    .range([0, width]);
    console.log(d3ArrayExtent(data, selectX))

  // Our y axis should just have a linear scale.
  // Our y domain will be the extent of y values (numbers) in our data set.
  const yScale = d3ScaleLinear()
    .domain(d3ArrayExtent(data, selectY))
    .range([height, 0]);
    console.log(d3ArrayExtent(data, selectY))

    // ADD:
  // Add an axis for our x scale which has half as many ticks as there are rows in the data set.
  const xAxis = d3AxisBottom()
  .scale(xScale)
  .ticks(data.length / 2);
// Add an axis for our y scale that has 3 ticks (FIXME: we should probably make number of ticks per axis a prop).
const yAxis = d3AxisLeft()
  .scale(yScale)
  .ticks(10)

  // These two functions select the scaled x and y values (respectively) of our data.
  const selectScaledX = datum => xScale(selectX(datum));
  const selectScaledY = datum => yScale(selectY(datum));

  // Create a d3Line factory for our scales.
  const sparkLine = d3Line()
    .x(selectScaledX)
    .y(selectScaledY);

    // Create a line path of for our data.
  const linePath = sparkLine(data);
  
  const circlePoints = data.map(datum => {
    return {
      total: datum.Total,
      date: datum.Date,
      x: selectScaledX(datum),
      y: selectScaledY(datum),
    }
  });

  return (
    <div>
      <ReactTooltip place="top" type="dark" effect="float" id="test"/>
      <SVGWithMargin
      className="container chart"
      contentContainerBackgroundRectClassName="contentContainerBackgroundRect"
      contentContainerGroupClassName="contentContainer"
      height={height}
      margin={margin}
      width={width}
      >
        <g
          className="xAxis"
          ref={node => d3Select(node).call(xAxis)}
          style={{
            transform: `translateY(${height}px)`,
          }}
        />
        <g className="yAxis" ref={node => d3Select(node).call(yAxis)} />

        <g className="line">
          <path d={linePath} />
        </g>
        <g className="scatter">
          {circlePoints.map(circlePoint => (
            <circle
              data-tip={"TEST"}
              data-for="test"
              cx={circlePoint.x}
              cy={circlePoint.y}
              key={`${circlePoint.x},${circlePoint.y}`}
              r={4}
            />
          ))}
        </g>
      </SVGWithMargin>
    </div>
  );
  }
}