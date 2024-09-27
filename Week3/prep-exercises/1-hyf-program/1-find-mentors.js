import { modules, students, mentors, classes } from "./hyf.js";

/**
 * Tjebbe would like help to get a list of possible mentors for a module.
 * Fill in this function that finds all the mentors that can teach the given module.
 *
 * It should return an array of names. So something like:
 *  ['John', 'Mary']
 */
const possibleMentorsForModule = (moduleName) => {
  const mentorsWhoCanTeach = mentors.filter(mentor => mentor.canTeach.includes(moduleName));
  const mentorsNames = mentorsWhoCanTeach.map((mentor => mentor.name));
  return mentorsNames;
};

console.log(possibleMentorsForModule('using-apis'));

/**
 * Tjebbe wants to make it even easier for himself.
 * Fill in this function that chooses a random mentor to teach the given module.
 *
 * It should return a single name.
 */
const findMentorForModule = (moduleName) => {
  const mentorsNames = possibleMentorsForModule(moduleName);
  const randomIndex = Math.floor(Math.random() * mentorsNames.length);
  return mentorsNames[randomIndex];
};

console.log(findMentorForModule('javascript'));
