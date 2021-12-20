import React from 'react';
import '../../css/Graph.css';
import '../../css/GIFGenerator.css';
import Slider from '../Slider';
import GIF from '@dhdbstjr98/gif.js';

class GIFGenerator extends React.Component {
  constructor() {
    super();
    this.state = {step: 0, duration: 5, loop: true, background: "#ffffff", rendering: false};
    this.animationId = 0;
  }


  generateGIF = () => {
    if(this.state.rendering) {
      return;
    }
    //clean input
    if(!Math.abs(Number(this.state.duration)) > 0) {
      console.log("Only numbers are allowed in duration!");
      return;
    }
    this.setState({rendering: true});
    this.setState({duration: Math.abs(this.state.duration)});
    var gif = new GIF( {
      workers: 2,
      quality: 10,
      repeat: this.state.loop? 0 : -1,
      background: this.state.background
    });

    //set download trigger
    gif.on('finished', function(blob) {
      this.setState({rendering: false});
      const link = document.createElement('a');
      // create a blobURI pointing to our Blob
      link.href = URL.createObjectURL(blob);
      link.download = "simulationGIF";
      // some browser needs the anchor to be in the doc
      document.body.append(link);
      link.click();
      link.remove();
      // in case the Blob uses a lot of memory
      setTimeout(() => URL.revokeObjectURL(link.href), 7000);
    }.bind(this));

    let stepBefore = this.state.step;

    //clear playing animation
    clearInterval(this.animationId);

    this.props.setState({step: 0}, () => {
      this.stepTime = 1;
      //this.animationId = setInterval(this.visualizeOneStep, this.stepTime);
      this.animationId = setInterval(this.grabImageAndNextStep.bind(null, gif, stepBefore), this.stepTime);
      this.props.setState({playing: true});
    });
  }

  grabImageAndNextStep = (gif, stepBefore) => {
    //check if we are at the end
    if (this.props.state.step > this.props.animationLength) {
      this.props.setState({step: stepBefore});
      this.props.visualizeOneStep(false);
      clearInterval(this.animationId);
      gif.render();
      this.props.setState({playing: false});
      return;
    }
    this.props.visualizeOneStep();
    //select the canvas (this is a bit hacky but ey it works)
    gif.addFrame(document.querySelectorAll("canvas")[2],
      // there is probably a minimum cap.... I'm not sure
      {copy: true, delay: this.state.duration / this.props.animationLength});
  }

  getButtonText = () => {
    if(this.state.rendering) {
      return "Please Wait ...";
    }
    return "Generate GIF 📸";
  }

    //onChange={(e) => this.setState({loop: e.state.value})}>
  render() {
    return (
    <div id="generateGIFPopup">
      <div className="popupHeader">
        GIF Generator
      </div>
      <div className="popupSection">
        <label htmlFor="gifDuration" id="gifLengthLabel">Duration In Seconds: </label>
        <input htmlFor="gifDuration" type="number" id="gifLengthInput"
        value={this.state.duration} onChange={(e) => this.setState({duration: e.target.value})}/>
      </div>

      <div className="popupSection">
        <label htmlFor="gifBackground" id="gifBackgroundLabel">Background Color: </label>
        <input htmlFor="gifBackground" id="gifBackgroundInput" type='color'
        value={this.state.background}
        onChange={(e) => this.setState({background: e.target.value})}/>
      </div>
      <div className="popupSection">
        <label htmlFor="gifLoop" id="gifLoopLabel">Loop: </label>
        <input htmlFor="gifLoop" id="gifLoopInput" type="checkbox" checked={this.state.loop}
        onChange={(e) => 
        this.setState({loop: e.target.checked})}/>
      </div>
      <button className="popupButton" onClick={this.generateGIF} >{this.getButtonText()}</button>
    </div>
    );
  }
}

export default GIFGenerator;
