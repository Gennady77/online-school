import { CourseData, User } from "../../types";

export const allCourses = [];
export const users: User[] = [];

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
