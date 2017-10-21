'use strict';

const remoteRequest = require('request'),
      moment        = require('moment');

import * as logger from './logger';

const request = (options, callback, args) => {
  options.headers = {
    'User-Agent': process.env.USER_AGENT
  };
  if (!args) {
    args = {
      options: options
    };
  }
  
  remoteRequest(options, (error, response, body) => {
    if (!error) {
      logger.action(`Request for ${options.url} got response`, [], 'gray');
      callback(null, response, args);
    } else {
      logger.action(`Failed to retrieve ${options.url}`, ['error']);
      logger.inspect(error);
      logger.action(`-----------------------`, ['error']);
      callback(error, response, args);
    }
  });
};

const repeat = (callback, timer) => {
  let updateInterval = 3 * 60 * 1000;
  if (timer) {
    updateInterval = timer * 60 * 1000;
  }
  return setInterval(callback, updateInterval);
};


const howLong = (arg) => {
  arg = moment(arg).fromNow();
  if (arg === 'Invalid date') {
    arg = '';
  }
  return arg;
};

const dynamicSort = (property, caseInsensitive) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property  = property.substr(1);
  }
  return function (a, b) {
    let result;
    if (caseInsensitive) {
      result = (a[property].toLocaleLowerCase() < b[property].toLocaleLowerCase()) ? -1 : (a[property].toLocaleLowerCase() > b[property].toLocaleLowerCase()) ? 1 : 0;
    } else {
      result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
    return result * sortOrder;
  }
};

const clone = (obj) => {
  if (obj == null || typeof(obj) != 'object')
    return obj;
  let temp = new obj.constructor();
  for (let key in obj)
    if (obj.hasOwnProperty(key))
      temp[key] = clone(obj[key]);
  return temp;
};

module.exports = {
  request:     request,
  repeat:      repeat,
  dynamicSort: dynamicSort,
  clone:       clone,
  howLong:     howLong
};
