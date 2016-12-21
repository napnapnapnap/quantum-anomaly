'use strict';

import Sequelize from 'sequelize';

import * as logger from '../helpers/logger';

let Users;

function init(sequelize) {
  Users = sequelize.define('Users', {
    name:      Sequelize.STRING,
    userGroup: Sequelize.JSON,
    email:     Sequelize.STRING
  });
  return Users;
}

const register = (user) => {
  return Users.create({
    name:      user.email.split('@')[0],
    userGroup: ['guest'],
    email:     user.email
  });
};

function findByEmail(email) {
  return Users.findOne({
    where: {
      email: email
    }
  });
}

function login(user) {
  if (!user.emails.length) {
    logger.action('Unauthorized login attempt - no email provided', ['error']);
    return {err: 'unauthorized'};
  }

  user.emails.forEach((email) => {
    if (email.type === 'account') {
      user.email = email.value;
    }
  });

  return findByEmail(user.email)
    .then((userRecord) => {
      if (userRecord) {
        logger.action(userRecord.email + ' logged in (group: ' + userRecord.userGroup + ')', ['access']);
        return userRecord;
      } else {
        if (process.env.REGISTRATION === 'true') {
          logger.action('Registering new user ' + user.email, ['userAction']);
          return register(user);
        } else {
          logger.action('Unauthorized login attempt - registrations are disabled', ['error']);
          return {err: 'unauthorized'};
        }
      }
    });
}

export {
  init,
  login
};
