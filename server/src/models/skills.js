export default function (sequelize) {
  let Skills = sequelize.define('Skills', {
    typeID: sequelize.Sequelize.INTEGER,
    value: sequelize.Sequelize.JSON,
  });

  Skills.getSkillsIdNamesPair = getSkillsIdNamesPair.bind(Skills);
  Skills.findById = findById.bind(Skills);
  Skills.getAllSkills = getAllSkills.bind(Skills);
  return Skills;
}

function findById(typeID) {
  return this.findOne({
    where: {
      typeID: typeID,
    },
  });
}

function getSkillsIdNamesPair() {
  return this.findAll().then((skills) => {
    const skillsCollection = {};
    skills.map((skill) => {
      skillsCollection[skill.dataValues.value.typeID] = skill.dataValues.value.typeName;
    });
    return skillsCollection;
  });
}

function getAllSkills() {
  return this.findAll().then((skills) => skills.map((skill) => skill.dataValues.value));
}
