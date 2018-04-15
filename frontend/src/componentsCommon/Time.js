import React, {Component} from 'react';

const getTimeString = (time, showSeconds = false) => {
  let days       = time.days,
      hours      = time.hours,
      minutes    = time.minutes,
      seconds    = time.seconds,
      timeString = '';
  
  if (time.days === 0 && time.hours === 0 && time.minutes < 5 && showSeconds) {
    timeString += `${minutes}m ${seconds}s`;
  } else {
    days += ' day';
    hours += ' hour';
    minutes += ' minute';

    if (time.days > 1) days += 's';
    if (time.hours > 1) hours += 's';
    if (time.minutes > 1) minutes += 's';

    if (time.days !== 0) timeString += days;
    if (time.hours !== 0) timeString += ` ${hours}`;

    timeString += ` ${minutes}`;

    if (time.days === 0 && time.hours === 0 && time.minutes === 0) {
      timeString = 'less than a minute';
    }

    timeString.replace('hour 0 minutes', 'hour');
    timeString.replace('hours 0 minutes', 'hours');
  }
  return timeString;
};

export default class Time extends Component {
  render() {
    return (
      <span>{getTimeString(this.props.time, this.props.showSeconds)}</span>
    );
  }
}
