import sendMail from './index';
import warframeStatus from '../warframe-status';

const notableAlerts = [];

function cleanExpired() {
  notableAlerts.forEach((notableAlert, index) => {
    if (Date.now() > notableAlert.id.split(' -> ')[1]) {
      notableAlerts.splice(index, 1);
    }
  });
}

function exists(alert) {
  let exists = false;
  notableAlerts.forEach(notableAlert => {
    if (alert.id === notableAlert.id) exists = true;
  });
  return exists;
}

function buildMessage() {
  let message = '';
  notableAlerts.forEach(notableAlert => {
    if (notableAlert.notified !== true) {
      message += `Alert at ${notableAlert.location} which ends ${notableAlert.end} offers: ${notableAlert.rewards.join(', ')}<br/>`;
      notableAlert.notified = true;
    }
  });
  return message;
}

function warframeAlerts() {
  warframeStatus().then(data => {
    cleanExpired();

    data.alerts.forEach(alert => {
      alert.rewards.forEach(reward => {
        if (reward.indexOf('Nitain') !== -1 || reward.indexOf('Orokin Reactor') !== -1 || reward.indexOf('Orokin Catalyst') !== -1) {
          if (!exists(alert)) notableAlerts.push(alert);
        }
      });
    });

    let message = buildMessage();
    if (message !== '') {
      message = `Interesting alerts: <br/><br/>${message} <br/>This message was auto generated, please do not reply`;
      sendMail({
        to:      process.env.WARFRAME_EMAILS,
        subject: 'Warframe Alerts',
        html:    message
      }, 'Warframe Alert email sent out');
    }
  });
}

export default function () {
  warframeAlerts();
  setInterval(function () {
    warframeAlerts();
  }, 5 * 60 * 1000);
}
