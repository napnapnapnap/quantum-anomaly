'use strict';

const classes = {
  messagesWrapper: 'ui-messages'
};

let timer,
    messagesWrapper;

function init() {
  messagesWrapper = document.getElementsByClassName(classes.messagesWrapper)[0];
  if (messagesWrapper) {
    messagesWrapper.addEventListener('click', function () {
      hide();
    });
  }
}
// type can be: success / error
function show(type = 'success', text, duration = 3000) {
  hide();
  messagesWrapper.innerHTML = text;
  messagesWrapper.classList.add(classes.messagesWrapper + '--' + type);
  timer = window.setTimeout(() => {
    hide();
  }, duration);
}

function hide() {
  if (timer) clearTimeout(timer);
  messagesWrapper.className = classes.messagesWrapper;
}

module.exports = {
  init: init,
  show: show,
  hide: hide,
};
