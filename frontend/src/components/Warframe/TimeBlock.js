import React, {Component} from 'react';

import Time from '../common/Time';

export default class Common extends Component {
  render() {
    let timeStart = this.props.timeStart,
        timeEnd   = this.props.timeEnd;
    
    return (
      <p className={this.props.className}>
        <span>{timeStart.future ? 'Starts in ' : 'Started '}</span>
        <Time time={timeStart}/>
        <span>{timeStart.future ? ', ends in ' : ' ago, ends in '}</span>
        <span className="bold"><Time time={timeEnd}/></span>
      </p>
    );
  }
}
