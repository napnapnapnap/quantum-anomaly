import * as logger from '../../helpers/logger';

function addPropertiesToSkills(skills, sequelize) {
  const query = 'SELECT * FROM "dgmTypeAttributes" ' +
    'INNER JOIN "dgmAttributeTypes" ' +
    'ON "dgmTypeAttributes"."attributeID" = "dgmAttributeTypes"."attributeID"';

  let promiseArray = [];

  skills.forEach(skill => {
    promiseArray.push(
      sequelize.query(query + ' WHERE "typeID"=' + skill.typeID, {type: sequelize.QueryTypes.SELECT})
        .then(attributes => {
          attributes.forEach(attribute => {
            if (attribute.published) {
              skill[attribute.attributeName] = attribute.valueFloat;
              if (!skill[attribute.attributeName]) {
                skill[attribute.attributeName] = attribute.valueInt;
              }
            }
          });
        })
    );
  });

  return Promise.all(promiseArray);
}

export default function (sequelize) {
  let skills;

  const query = 'SELECT "typeID", "typeName", "description", "invTypes"."groupID", "groupName" ' +  
    'FROM "invTypes" ' +
    'JOIN "invGroups" ON "invTypes"."groupID" = "invGroups"."groupID" ' +
    'JOIN "invCategories" ON "invGroups"."categoryID" = "invCategories"."categoryID" ' +
    'WHERE "invCategories"."categoryID"=16 AND "invTypes"."published"=true;';

  return sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(skillsData => {
      skills = skillsData;
      logger.action('Grabbed data for ' + skills.length + ' skills');
      return addPropertiesToSkills(skills, sequelize);
    }).then(() => {
      logger.action('Added properties to each skill');
      return skills;
    });
};
