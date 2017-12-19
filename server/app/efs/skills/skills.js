import * as Skills from '../../../models/skills';

export default function () {
  return Skills.getAllSkills().then(skills => {
    let skillsFormatted = {};

    skills.forEach(skill => {
      if (!skillsFormatted[skill.groupName]) {
        skillsFormatted[skill.groupName] = [];
      }
      skillsFormatted[skill.groupName].push(skill);
    });

    const skillsFormattedSorted = {};
    Object.keys(skillsFormatted).sort().forEach(key => {
      skillsFormattedSorted[key] = skillsFormatted[key];
    });

    return skillsFormattedSorted;
  });
};
