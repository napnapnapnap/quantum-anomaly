import Sequelize from 'sequelize';

let Skills;

function init(sequelize) {
  Skills = sequelize.define('Skills', {
    typeID: Sequelize.INTEGER,
    value:  Sequelize.JSON
  });
  return Skills;
}

function findById(typeID) {
  return Skills.findOne({
    where: {
      typeID: typeID
    }
  });
}

function getSkillsIdNamesPair() {
  return Skills.findAll().then(skills => {
    const skillsCollection = {};
    skills.map(skill => {
      skillsCollection[skill.dataValues.value.typeID] = skill.dataValues.value.typeName;
    });
    return skillsCollection;
  });
}

function getAllSkills() {
  return Skills.findAll().then(skills => skills.map(skill => skill.dataValues.value));
}

export {
  init,
  findById,
  getSkillsIdNamesPair,
  getAllSkills
};
