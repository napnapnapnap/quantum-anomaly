import sendMail from './index';
import warframeStatus from '../warframe-status';

const notableAlerts = [];

function cleanExpired() {
  notableAlerts.forEach((notableAlert, index) => {
    /* Delay removing alerts from mailed list for 10 minutes after expiry
       Reasons:
         This is held in global array, so we want to remove them eventually
         However, here and there it happens we remove alert from the array
         but it is still available on API so gets send again because we are
         checking custom ID, not the read expiry date from API
     */
    const timeOffset = Date.now() + (10  * 60 * 1000);
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
    cleanExpired();
  });
}

export default function () {
  warframeAlerts();
  setInterval(function () {
    warframeAlerts();
  }, 5 * 60 * 1000);
}
