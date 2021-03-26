import React from "react";
import { View, Text } from "react-native";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'



export default class CompareGraph extends React.Component { 
    
    render() { 
      // Assigns variables parsed from 'StockWatchlist'
      var data1 = this.props.data1;
      var data2 = this.props.data2;
      var xMax = this.props.xMax;
      var yMin = this.props.yMin;
      var yMax = this.props.yMax;
      var height = "50%";
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
          <HorizontalAxis tickCount={5} />

          {/* First line on graph */}
          <Line
          theme={{
            stroke: { color: '#cc171d', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#ad1117' }},
             gradient: { from: { color: '#0f0', opacity: 0.5 }, to: { color: '#0f0', opacity: 0.5 } } }}
          smoothing="cubic-spline"
          data={data1}
        />
        {/* Second line on graph */}
        <Line
          theme={{ stroke: { color: '#224373', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#192f4f' }},
           gradient: { from: { color: '#00f', opacity: 0.5 }, to: { color: '#00f', opacity: 0.5 } } }}
          smoothing="cubic-spline"
          data={data2}
        />
        </Chart>
      );
    }
  }