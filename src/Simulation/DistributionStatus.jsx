import React from 'react';

class DistributionStatus extends React.Component{
	render(){
    if (this.props.valid === true) {
      return(<div className="DistributionStatus valid"><h3 className="StatusText">
          The total distribution is equal to 1 ✅
        </h3></div>);
    }
    else {
      return(<div className="DistributionStatus invalid"><h3 className="StatusText">
          The total distribution must equal 1 ✖️
        </h3></div>);
    }
	};
}

export default DistributionStatus;
