import React from "react";
import '../css/Slider.css'

class Slider extends React.Component{
  componentDidMount() {

  }
	render(){
    return (
      <div className='SliderDiv'>
        <label htmlFor='Slider' className='SliderDescription'>{this.props.description}</label>
        <input className='Slider' type='range' min={this.props.min} max={this.props.max} value={this.props.currentValue}
        onChange={this.props.handleChange} step={this.props.step}
      />
          <input type="number" htmlFor='Slider' className='SliderValue' value={this.props.currentValue} onChange={this.props.handleChange}/>
    </div>
        );
  }
}

export default Slider;
