import React from 'react';

class Dropdown extends React.Component{
	constructor(props){
		super(props);
		this.changeVal = this.changeVal.bind(this);
	}

	createOption(data, index){
		return (
			<option value={data.name} key={index}>{data.name}</option>
			);
	}

	changeVal(e){
		let newVal = this.props.options[e.target.selectedIndex];
		this.props.handleChange(newVal);
	}

	render(){
		return(
			<div className='DropdownDiv'>
				<label htmlFor='Dropdown' className='dropdownDescription'>{this.props.description}</label>
				<select id='Dropdown'
				name={this.props.name}
        onChange={this.changeVal}>
					{this.props.options.map(this.createOption)}
				</select>
			</div>
		);
	};
}

export default Dropdown;
