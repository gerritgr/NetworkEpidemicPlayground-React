import React from "react";
import NVD3Chart from 'react-nvd3';
import '../../css/Chart.css'
import '../../css/nv3d.css'

class Chart extends React.Component {
  calculateChartData = () => {
    for (let i = 0; i < this.props.stateCounts.length; i++) {
      //set color
      this.props.stateCounts[i].color = 
        this.props.colors.find(element => element[0] ===
          this.props.stateCounts[i]["key"]
        )[1]
      //apply cropping
      this.props.stateCounts[i]["values"] = 
        this.props.stateCounts[i]["values"].slice(0, this.props.animationLength + 1);
    }
    return this.props.stateCounts;
  }

  render() {
    return(
      <div id="chart">
        <NVD3Chart type="stackedAreaChart" xAxis={{ tickFormat: (d) => this.props.timeSteps[d]}} datum={this.calculateChartData} x={(d) => d[0]} y={(d) => d[1]} />
      </div>);
  }
}

export default Chart;
