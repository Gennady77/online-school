import { CourseData } from "../../types";

export const allCourses = [{
  id: 1,
  title: 'Алгоритмы',
  date: new Date('2021-09-01')
}, {
  id: 2,
  title: 'Computer Science',
  date: new Date('2021-09-10')
}, {
  id: 3,
  title: 'Математическая статистика',
  date: new Date('2021-10-01')
}, {
  id: 4,
  title: 'Политическая экономика',
  date: new Date('2021-10-15')
}, {
  id: 5,
  title: 'CSS методология',
  date: new Date('2021-10-21')
}];

export const userCourses: {[key: string]: CourseData[]} = {};

export function getUserCourseList(id: string | null): CourseData[] {
  if(id === null) {
    return allCourses;
  }

  if(!userCourses[id]) {
    userCourses[id] = [];
  }

  return userCourses[id];
}
