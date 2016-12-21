'use strict';

const uiMessages = require('../ux/messages');

const genericErrorMessage = (message) => {
  message = message || 'Something went wrong';
  uiMessages.show('error', message)
};

const _xhrProcess = (xhr, callback) => {
  if (xhr.readyState === 4) {
    let response = xhr.response,
        status = xhr.status !== 200;

    if (xhr.getResponseHeader('content-type') === 'application/json; charset=utf-8') {
      response = JSON.parse(response);
      if (response.status) {
        uiMessages.show(response.status.type, response.status.message);
        if (response.status.type === 'error') {
          status = response.status.message;
        }
      }
      if (response.data) {
        response = xhr.response.data;
      }
    }
    callback(status, response);
  }
};

const xhr = (options, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.uri);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(options.data));

  xhr.onreadystatechange = () => {
    _xhrProcess(xhr, callback);
  }
};

const xhrForm = (form, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);
  xhr.send(new FormData(form));

  xhr.onreadystatechange = () => {
    _xhrProcess(xhr, callback);
  }
};

const getClosest = (elem, selector) => {
  if (elem.classList.contains(selector)) {
    return elem;
  }
  else if (elem !== document.body) {
    return getClosest(elem.parentElement, selector);
  }
  return false;
};

module.exports = {
  xhrForm:             xhrForm,
  xhr:                 xhr,
  getClosest:          getClosest,
  genericErrorMessage: genericErrorMessage
};
