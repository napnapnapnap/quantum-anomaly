import sendMail from './index';
import warframeStatus from '../warframe-status';

const mailQueue = [];

function time(arg) {
  let days        = arg.days,
      hours       = arg.hours,
      minutes     = arg.minutes,
      seconds     = arg.seconds,
      showSeconds = arg.showSeconds || false,
      timeString  = '';

  if (arg.days === 0 && arg.hours === 0 && arg.minutes < 5 && showSeconds) {
    timeString += `${minutes}m ${seconds}s`;
  } else {
    days += ' day';
    hours += ' hour';
    minutes += ' minute';

    if (arg.days > 1) days += 's';
    if (arg.hours > 1) hours += 's';
    if (arg.minutes > 1) minutes += 's';

    if (arg.days !== 0) timeString += days;
    if (arg.hours !== 0) timeString += ` ${hours}`;
    timeString += ` ${minutes}`;

    if (arg.days === 0 && arg.hours === 0 && arg.minutes === 0)
      timeString = 'less than a minute';
  }
  return timeString;
}

function removeExpired() {
  mailQueue.forEach((mailItem, index) => {
    /* Delay removing sent alerts from array for 1 hour after expiry
       Reasons:
         This is held in global array, so we want to remove them eventually
         However, here and there it happens we remove alert from the array
         but it is still available on API so gets send again.
     */
    const timeOffsetEnd = parseInt(mailItem.end) + (60 * 60 * 1000);
    if (Date.now() > timeOffsetEnd) mailQueue.splice(index, 1);
  });
}

function getMailQueueMessages() {
  let message = '';
  mailQueue.forEach(mailItem => {
    if (mailItem.notified !== true) {
      message += `Alert at ${mailItem.location} which ends in ${time(mailItem.timeEnd)} offers: ${mailItem.rewards.join(', ')}<br/>`;
      mailItem.notified = true;
    }
  });
  return message;
}

function checkMailQueue() {
  let queueHasUnsent = false;
  mailQueue.forEach(mailItem => {
    if (mailItem.notified !== true) queueHasUnsent = true;
  });

  if (queueHasUnsent) {
    let htmlBody = `Interesting alerts: <br/><br/>${getMailQueueMessages()}<br/>This message was auto generated, please do not reply`;
    sendMail({
      to:      process.env.WARFRAME_EMAILS,
      subject: 'Warframe Alerts',
      html:    htmlBody
    }, 'Warframe Alert email sent out');
  }
}

function hasInterestingRewards(rewards) {
  let hasInterestingRewards = false;
  rewards.forEach(reward => {
    if (
      reward.indexOf('Nitain') !== -1 ||
      reward.indexOf('Orokin Reactor') !== -1 ||
      reward.indexOf('Orokin Catalyst') !== -1 ||
      reward.indexOf('Kavat') !== -1
    ) hasInterestingRewards = true;
  });
  return hasInterestingRewards;
}

function warframeAlerts() {
  warframeStatus().then(data => {
    data.alerts.forEach(alert => {
      let shouldBeSent = true;
      // already expired
      if (Date.now() > parseInt(alert.end)) shouldBeSent = false;
      // already sent out as mail
      mailQueue.forEach(sentMail => {
        if (sentMail.end === alert.end && sentMail.location === alert.location)
          shouldBeSent = false;
      });
      // don't send unless it contains one of these rewards
      if (shouldBeSent) shouldBeSent = hasInterestingRewards(alert.rewards);
      if (shouldBeSent) mailQueue.push(alert);
    });
    checkMailQueue();
    removeExpired();
  });
}

export default function () {
  warframeAlerts();
  setInterval(function () {
    warframeAlerts();
  }, 3 * 60 * 1000);
}
