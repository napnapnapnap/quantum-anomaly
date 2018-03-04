import React, {Component} from 'react';

export default class Time extends Component {
  render() {
    let days        = this.props.time.days,
        hours       = this.props.time.hours,
        minutes     = this.props.time.minutes,
        seconds     = this.props.time.seconds,
        showSeconds = this.props.showSeconds || false,
        timeString  = '';
    
    if (this.props.time.days === 0 && this.props.time.hours === 0 && this.props.time.minutes < 5  && showSeconds) {
      timeString += `${minutes}m ${seconds}s`;
    } else {
      days += ' day';
      hours += ' hour';
      minutes += ' minute';
      
      if (this.props.time.days > 1) days += 's';
      if (this.props.time.hours > 1) hours += 's';
      if (this.props.time.minutes > 1) minutes += 's';

      if (this.props.time.days !== 0) timeString += days;
      if (this.props.time.hours !== 0) timeString += ` ${hours}`;
      timeString += ` ${minutes}`;
      
      if (this.props.time.days === 0 && this.props.time.hours === 0 && this.props.time.minutes === 0)
        timeString = 'less than a minute'
    }
    
    return (
      <span className="time time__full-string">
        {timeString}
      </span>
    );
  }
}
