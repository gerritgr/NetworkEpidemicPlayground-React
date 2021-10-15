import React from 'react';
import Slider from './Slider';

class HorizonSelector extends React.Component{
	render(){
		return (
			<div id='HorizonSelector'>
				<h2 id='HorizonSelectorName' className='selectorName'>
					Select the simulation horizon</h2>
				<Slider description='Select Horizon'
				handleChange={this.props.handleChange}
				currentValue={this.props.currentValue}
				min='1' max='200'/>
			</div>
		);
	}
}

export default HorizonSelector;
