import React, {Component} from 'react';

import Time from '../../componentsCommon/Time';

export default class Common extends Component {
  render() {
    let timeStart   = this.props.timeStart,
        timeEnd     = this.props.timeEnd,
        showSeconds = this.props.showSeconds || false;

    return (
      <p className={this.props.className}>
        <span>{timeStart.future ? 'Starts in ' : 'Started '}</span>
        <Time time={timeStart} showSeconds={showSeconds}/>
        <span>{timeStart.future ? ', ends in ' : ' ago, ends in '}</span>
        <span className="bold"><Time time={timeEnd} showSeconds={showSeconds}/></span>
      </p>
    );
  }
}
