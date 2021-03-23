import React from "react";
import { View, Text } from "react-native";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'

const dataIN1 = [
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 8 },
    { x: 4, y: 10 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
  ];
  
  const dataIN2 = [
      { x: -2, y: 1 },
      { x: -1, y: 1 },
      { x: 0, y: 1.5 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 4 },
      { x: 4, y: 5 },
      { x: 5, y: 17 },
      { x: 6, y: 11 },
      { x: 7, y: 7 },
      { x: 8, y: 3 },
      { x: 9, y: 5 },
      { x: 10, y: 10 },
  ];

export default class PriceGraph extends React.Component { 
  constructor(props) {
    super(props);

  }

    render() { 

      var data = this.props.data;
      var xMax = this.props.xMax;
      var yMin = this.props.yMin;
      var yMax = this.props.yMax;
      var height = "80%";
      if(this.props.height){
        height = this.props.height
      }

      return (
        <Chart
          style={{ height: height, width: "100%"}}
          data={[
            
          ]}
          padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          xDomain={{ min: 0, max: xMax }}
          yDomain={{ min: yMin, max: yMax }}
          viewport={{ size: { width: 15 }, initialOrigin: {x: xMax-15} }}
        >
          <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
          <HorizontalAxis tickCount={1} theme={{ labels: { formatter: (meta) => meta.toFixed(0) }}}/>
          <Line
          
          theme={{
            stroke: { color: '#cc171d', width: 5 }, scatter: { default: { width: 6, height: 6, rx: 2, color: '#ad1117' }},
             gradient: { from: { color: '#0f0', opacity: 0.5 }, to: { color: '#0f0', opacity: 0.5 } } }}
          
          data={data}
        />
        
        </Chart>
      );
    }
  }