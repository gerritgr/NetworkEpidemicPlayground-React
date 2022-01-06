import React from "react";
import Slider from "../Slider";
import '../../css/Model.css';

class Model extends React.Component {
  constructor(optionName, states, rules, ruleMax, ruleStep) {
    super();
    this.optionName = optionName;
    this.states = states;
    this.rules = rules;
    this.ruleMax = ruleMax;
    this.ruleStep = ruleStep;
    //this.state = {valid: true};
    this.valid = true;
    this.checkValidity();
  }

  //override default get name
  get name() {
    return this.optionName;
  }

  getRules() {
    return this.rules;
  }


  getStates() {
    var output = [];
    this.states.forEach((s) => {
      output.push(s[0]);
    });
    return output;
  }

  getColors() {
    var output = [];
    this.states.forEach((s) => {
      output.push([s[0], s[2]]);
    });
    return output;
  }

  getDistribution() {
    var output = [];
    this.states.forEach((s) => {
      output.push(s[1]);
    });
    return output;
  }

  componentDidMount() {
    //update
    this.props.updateSelectedModel(this);
  }

  changeProbability = (spot, e) =>  {
    //update state
    this.setState({});
    this.rules[spot][2] = Number(e.target.value);
    //update
    this.props.updateSelectedModel(this);
  }

  //normalize the distribution to 1 to ease the user experience with a button
  normalizeDistribution = () => {
    let sum = this.calculateSumOfDistributions();
    // do not act if we have a sum of 1
    if (sum === 0) {
      return;
    }
    //check if we need to add or remove it by changing the sign
    this.states = this.states.map((element) => {
      element[1] = Number((element[1] / sum).toPrecision(2));
      return element;
    });
    //update
    this.valid = true;
    this.setState({});
  }

  checkValidity() {
    let sum = this.calculateSumOfDistributions();
    //check if the distribution is about 1
    if (sum < 0.99 || sum > 1.01) {
      //this.setState({valid: false});
      this.valid = false;
      return;
    }
    //this.setState({valid: true});
    this.valid = true;
  }

  calculateSumOfDistributions() {
    let sum = 0;
    this.getDistribution().forEach((element) => {
      sum += element;
    });
    return sum;
  }

  changeDistribution = (spot, e) =>  {
    //update state
    this.setState({});
    this.states[spot][1] = Number(e.target.value);
    //update
    this.props.updateSelectedModel(this);
    //this.checkValidity();
  }

  changeColor = (spot, e) => {
    this.setState({});
    this.states[spot][2] = e.target.value;
    //update
    this.props.updateSelectedModel(this);
  }

  //build the description of the slider
  buildDesc(r) {
    var output = r[0] + "->" + r[1];
    return output.replaceAll(",", "+");
  }

  //build all sliders
  buildSliders(max, step) {
    var output = [];
    var count = 0;
    this.getRules().forEach((r) =>  {
      var tempCount = count;
      output.push(<Slider key={tempCount} description={this.buildDesc(r)} handleChange={(e) => this.changeProbability(tempCount, e)} min="0" max={max} currentValue={r[2]} step={step}/>)
      count++;
    });

    return output;
  }

  //build the sliders for the initial distribution
  buildSlidersDistribution() {
    //var output = [<button key="normalization" id="normalizeDistribution" onClick={this.normalizeDistribution}>Normalize distribution 🔔</button>, <DistributionStatus key="validation" valid={this.valid}/>];
    var output = [];
    var count = 0;
    this.states.forEach((s) => {
      //clamp description
      let description = s[0];
      if (description.length > 10) {
        description = description.substring(0,11) + "...";
      }
      var tempCount = count;
      output.push(<div key={tempCount * -tempCount - 100}>
        <input key={-tempCount - 1} type="color" className="ColorPicker" value={this.states[tempCount][2]} onChange={(e) => this.changeColor(tempCount, e)}/>
        <Slider key={tempCount} description={description} handleChange={(e) => this.changeDistribution(tempCount, e)} min="0" max="1" currentValue={s[1]} step="0.001"/>
      </div>
      );
      count ++;
    });

    return output;
  }

  render() {
    return (
      <div className="modelSelector">
        <h3 id="selectRulesHeader">Transition Rates</h3>
        {this.buildSliders(this.ruleMax, this.ruleStep)}
        <h3 id="selectDistributionHeader">Initial Distribution</h3>
        {this.buildSlidersDistribution()}
      </div>
    );
  }
}

export default Model;
