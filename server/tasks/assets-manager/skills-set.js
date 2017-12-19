import Sequelize from 'sequelize';

import * as logger from '../../helpers/logger';

function saveSkills(Skills, skills) {
  let promiseArray = [];
  skills.forEach(skill => {
    promiseArray.push(
      Skills.create({
        typeID: skill.typeID,
        value:  skill
      })
    );
  });
  return Promise.all(promiseArray);
}

export default function (sequelize, skills) {
  const Skills = sequelize.define('Skills', {
    typeID: Sequelize.INTEGER,
    value:  Sequelize.JSON
  });

  return Skills.sync({force: true}).then(() => {
    logger.action('Skills model synced', [], 'green');
    return saveSkills(Skills, skills);
  }).then(() => {
    logger.action('Skills model saved', [], 'green');
  });
};
