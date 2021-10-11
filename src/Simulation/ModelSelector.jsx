import React from 'react';

import Dropdown from './Dropdown.jsx'
import SIModel from './exampleModels/SIModel.jsx';
import SEIRSModel from './exampleModels/SEIRSModel.jsx';
import CoronaModel from './exampleModels/CoronaModel.jsx';
import Custom from './exampleModels/Custom.jsx';

class ModelSelector extends React.Component{
	constructor(props){
		super(props);
		//predefined networks go here
    this.SIModel = new SIModel();
    this.SEIRSModel = new SEIRSModel();
    this.CoronaModel = new CoronaModel();
    //this.custom = new Custom();

		this.state = {predefinedModels: [this.SIModel, this.SEIRSModel, this.CoronaModel]
									, currentValue: "SIModel"};
		this.dropdownChanged = this.dropdownChanged.bind(this);
		this.updateSelectedModel = this.updateSelectedModel.bind(this);
		}

	dropdownChanged(e){
		this.setState({currentValue: e.name});
		this.props.handleChange(e);
	}

  //when the object changed we need to update it again
  updateSelectedModel(e) {
    this.props.handleChange(e);
  }

	renderCustomHtml(){
		switch(this.state.currentValue){
			case "SIModel":
				return <SIModel updateSelectedModel={this.updateSelectedModel}/>
			case "SEIRSModel":
				return <SEIRSModel updateSelectedModel={this.updateSelectedModel}/>
			case "CoronaModel":
				return <CoronaModel updateSelectedModel={this.updateSelectedModel}/>
			case "Custom":
				return <Custom updateSelectedModel={this.updateSelectedModel}/>
			default:
				break;
		}
	}

	render(){
		return(
			<div id='ModelSelector'>
				<h2 id='ModelSelectorName' className='selectorName'>
					Contact Model</h2>
				<Dropdown name='Select Model'
				description='Select a network'
				options={this.state.predefinedModels}
				handleChange={this.dropdownChanged}/>
				{this.renderCustomHtml()}
			</div>
			);
	}
}

export default ModelSelector;
