import bcrypt from 'bcrypt-nodejs';
import * as logger from '../helpers/logger';

export default function (sequelize) {
  let Users = sequelize.define('Users', {
    name:      sequelize.Sequelize.STRING,
    userGroup: sequelize.Sequelize.JSON,
    email:     sequelize.Sequelize.STRING,
    password:  sequelize.Sequelize.STRING
  });

  Users.findByEmail = findByEmail.bind(Users);
  Users.login = login.bind(Users);
  Users.register = register.bind(Users);
  Users.validatePassword = validatePassword.bind(Users);
  return Users;
}

function findByEmail(email) {
  return this.findOne({
    where: {
      email: email
    }
  });
}

async function register(user) {
  let existingUser = await this.findByEmail(user.email);
  if (existingUser) return login(user);

  return this.create({
    name:      user.email.split('@')[0],
    email:     user.email,
    password:  generateHash(user.password),
    userGroup: ['guest']
  });
}

function login(user) {
  if (!user.email.length) {
    logger.error('Unauthorized login attempt - no email provided');
    return {err: 'unauthorized'};
  }

  return this.findByEmail(user.email)
    .then((userRecord) => {
      if (userRecord) {
        logger.action(userRecord.email + ' logged in (group: ' + userRecord.userGroup + ')');
        return userRecord;
      } else {
        logger.error('Unauthorized login attempt - not registered');
        return {err: 'unauthorized'};
      }
    });
}

export function validatePassword(passwordProvided, passwordUser) {
  return bcrypt.compareSync(passwordProvided, passwordUser);
}

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
