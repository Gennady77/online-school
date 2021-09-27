import { COURSE_TYPE, CourseData, User } from "../../types";
import { HttpParams } from "@angular/common/http";

export const allCourses = [];
export const users: User[] = [];

export const userCourses: {[key: string]: CourseData[]} = {};

export function getUserCourseList(id: string | null): CourseData[] {
  const storage: CourseData[] = JSON.parse(localStorage.getItem(COURSES_STORAGE_KEY) ?? '[]');

  if(id === null) {
    return storage;
  }

  const userMapCourses: {[key: string]: number[]} = JSON.parse(localStorage.getItem(USER_MAP_COURSES_STORAGE_KEY) ?? '{}');

  if(!userMapCourses[id]) {
    userMapCourses[id] = [];
  }

  return userMapCourses[id].map(courseId => storage.find(item => item.courseId === courseId) as CourseData);
}

const COURSES_STORAGE_KEY = 'courses';
const USER_MAP_COURSES_STORAGE_KEY = 'users_map_courses';
const USERS_STORAGE_KEY = 'users';
const USER_MAP_TOKEN_STORAGE_KEY = 'user_map_token';

export function storeUser(request: HttpParams, token: string): User {
  const storage: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) ?? '[]');
  const userMapToken: {[key: string]: number} = JSON.parse(localStorage.getItem(USER_MAP_TOKEN_STORAGE_KEY) ?? '{}');

  let userId: number;
  let user = storage.find(item => item.email === request.get('userEmail'));

  if(!user) {
    userId = storage.length + 1;
    user = {
      id: userId,
      email: getString(request.get('userEmail'))
    }
    storage.push(user);
  } else {
    userId = user.id;
  }

  userMapToken[token] = userId;

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(storage));
  localStorage.setItem(USER_MAP_TOKEN_STORAGE_KEY, JSON.stringify(userMapToken));

  return user;
}

export function getUserByToken(token: string): User | undefined {
  const storage: User[] = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) ?? '[]');
  const userMapToken: {[key: string]: number} = JSON.parse(localStorage.getItem(USER_MAP_TOKEN_STORAGE_KEY) ?? '{}');
  const userId = userMapToken[token];

  return storage.find(item => item.id === userId);
}

export function storeCourse(request: HttpParams) {
  const storage: CourseData[] = JSON.parse(localStorage.getItem(COURSES_STORAGE_KEY) ?? '[]');
  const userMapCourses: {[key: string]: number[]} = JSON.parse(localStorage.getItem(USER_MAP_COURSES_STORAGE_KEY) ?? '{}');
  const courseId = storage.length + 1;
  const userId = getNumber(request.get('userId'));

  storage.push({
    courseId: courseId,
    courseName: getString(request.get('courseName')),
    courseDate: getNumber(request.get('courseDate'), new Date().getTime()),
    courseDuration: getNumber(request.get('courseDuration')),
    courseType: getNumber(request.get('courseType'), COURSE_TYPE.ONLINE),
    courseUrl: request.get('courseUrl'),
    coursePlaceBuilding: getNumberOrNull(request.get('coursePlaceBuilding')),
    coursePlaceRoom: getNumberOrNull(request.get('coursePlaceRoom')),
    courseComment: getString(request.get('courseComment'))
  });

  if(userId && !userMapCourses[userId]) {
    userMapCourses[userId] = [];
  }

  userMapCourses[userId].push(courseId);

  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(storage));
  localStorage.setItem(USER_MAP_COURSES_STORAGE_KEY, JSON.stringify(userMapCourses));
}

export function removeUserToken(token: string) {
  const userMapToken: {[key: string]: number} = JSON.parse(localStorage.getItem(USER_MAP_TOKEN_STORAGE_KEY) ?? '{}');

  delete(userMapToken[token]);

  localStorage.setItem(USER_MAP_TOKEN_STORAGE_KEY, JSON.stringify(userMapToken));
}

function getNumberOrNull(val: string | null): number | null {
  return val ? parseInt(val as string, 10) : null;
}

function getNumber(val: string | null, defval = 0): number {
  return val ? parseInt(val as string, 10) : defval;
}

function getString(val: string | null, defval = ''): string {
  return val ?? defval;
}
