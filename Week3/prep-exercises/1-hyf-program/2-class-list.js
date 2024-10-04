import { modules, students, mentors, classes } from "./hyf.js";

/**
 * We would like to have a list of everyone that is currently participating in a class.
 * This means the students, but also the mentors that are currently teaching the class.
 * The students should be self explanatory, but to find the mentors you will need to follow these steps:
 * - Check what the `currentModule` of the class is
 * - Find the mentor(s) that are `nowTeaching` that module
 *
 * Should return the list of names and their roles. So something like:
 *
 *  [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }]
 */

const getPeopleOfClass = (className) => {
  
  function filterByProperty (people, property, value) {
    return people.filter((person) => {
      const prop = person[property];
      if (Array.isArray(prop)) {
        return prop.includes(value);
      } else {
        return prop === value;
      }
    });
  }

  function getPeopleInfo(people, role) {
    return people.map((person) => ({ name: person.name, role: role}));
  }

  const classStudents = filterByProperty(students, 'class', className);
  const classStudentsInfo = getPeopleInfo(classStudents, 'student')

  const currentClass = classes.find(curClass => curClass.name === className);
  if (!currentClass) {
    console.error(`There is no ${currentClass} in the list`);
    return [];
  }

  const currentModuleOfClass = currentClass.currentModule; 

  const currentMentor = filterByProperty(mentors, 'nowTeaching', currentModuleOfClass);
  const currentMentorInfo = getPeopleInfo(currentMentor, 'mentor');

  return classStudentsInfo.concat(currentMentorInfo);
}

console.log(getPeopleOfClass('class34'));

/**
 * We would like to have a complete overview of the current active classes.
 * First find the active classes, then for each get the people of that class.
 *
 * Should return an object with the class names as properties.
 * Each class name property contains an array identical to the return from `getPeopleFromClass`. So something like:
 *
 *  {
 *    class34: [{ name: 'John', role: 'student' }, { name: 'Mary', role: 'mentor' }],
 *    class35: [{ name: 'Jane', role: 'student' }, { name: 'Steve', role: 'mentor' }]
 *  }
 */

const getActiveClasses = () => {
 return classes
  .filter((activeClass) => 
    activeClass.active === true)
  .reduce((result, curClass) => {
    result[curClass.name] = getPeopleOfClass(curClass.name);
    return result;
  }, {});
};

console.log(getActiveClasses());
