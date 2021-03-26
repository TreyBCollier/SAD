import React from "react";
import { View, Text } from "react-native";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis, Tooltip } from 'react-native-responsive-linechart'
import DropDownPicker from 'react-native-dropdown-picker';



export default class PriceGraph extends React.Component { 
  constructor(props) {
    super(props);

  }

    render() { 
      // Assigns variables parsed from 'StockWatchlist'
      var data = this.props.data;
      var xMin = this.props.xMin;
      var xMax = this.props.xMax;
      var yMin = this.props.yMin;
      var yMax = this.props.yMax;
      var viewPort = this.props.viewPort
      var tickCount = this.props.tickCount
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
          viewport={{ size: { width: viewPort }, initialOrigin: {x: xMax-15} }}
        >
          <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
          <HorizontalAxis tickCount={tickCount} theme={{ labels: { formatter: (v) => v.toFixed(0) }}}/>
          
          {/* First line on graph */}
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