import React from 'react'
import { Chart } from "react-google-charts";


const CircleChart = (props) => {


    return (
        <div>


            <Chart
 className= "pie-chart"
  width={'100%'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={props.chartData}
  options={{
    title: '',
    // backgroundColor: "rgb(46, 46, 46)",
    backgroundColor:"#4b4b4b",
    colors: ['#0353A4', "#023E7D", "002855", "001845"]
  }}
  rootProps={{ 'data-testid': '1' }}
/>
        </div>
    )
}

export default CircleChart
