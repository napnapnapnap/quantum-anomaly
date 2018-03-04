export function timeFrom(arg) {
  arg = parseInt(arg);
  
  let difference = new Date().getTime() - arg,
      seconds    = 0,
      minutes    = 0,
      hours      = 0,
      days       = 0,
      future     = false;

  if (difference < 0) {
    future = true;
    difference *= -1;
  }
  seconds = Math.ceil(difference / 1000);
  
  if (seconds > 60 * 60 * 24) {
    days    = Math.floor(seconds / 60 / 60 / 24);
    seconds = seconds - (days * 60 * 60 * 24);
  }
  if (seconds > 60 * 60) {
    hours   = Math.floor(seconds / 60 / 60);
    seconds = seconds - (hours * 60 * 60);
  }
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds - (minutes * 60);
  }

  return {
    days:    days,
    hours:   hours,
    minutes: minutes,
    seconds: seconds,
    future:  future
  };
}
