import React from 'react';

import Dropdown from './Dropdown.jsx'
import KarateClass from './exampleNetworks/Karate.jsx';
import Grid from './exampleNetworks/Grid.jsx';
import Custom from './exampleNetworks/Custom.jsx';

class ContactSelector extends React.Component{
	constructor(props){
		super(props);
		//predefined networks go here
		this.Karate = new KarateClass();
		this.Grid = new Grid();

		//obligatory custom network
		this.custom = new Custom();

		this.state = {predefinedNetworks: [this.Karate, this.Grid, this.custom]
									, currentValue: "Karate"};
		this.dropdownChanged = this.dropdownChanged.bind(this);
		this.updateGraphObject = this.updateGraphObject.bind(this);
		}

	dropdownChanged(e){
		this.setState({currentValue: e.name});
		this.props.handleChange(e);
	}

  //when the object changed we need to update it again
  updateGraphObject(e) {
    this.props.handleChange(e);
  }

	renderCustomHtml(){
		switch(this.state.currentValue){
			case "Karate":
				return <KarateClass updateGraphObject={this.updateGraphObject}/>
			case "2D-Grid":
				return <Grid updateGraphObject={this.updateGraphObject}/>
			case "Custom":
				return <Custom updateGraphObject={this.updateGraphObject}/>
			default:
				break;
		}
	}

	render(){
		return(
			<div id='ContactSelector'>
				<h2 id='ContactSelectorName' className='selectorName'>
					Contact Network</h2>
				<Dropdown name='Select Network'
				description='Select a network'
				options={this.state.predefinedNetworks}
				handleChange={this.dropdownChanged}/>
				{this.renderCustomHtml()}
			</div>
			);
	}
}

export default ContactSelector;
