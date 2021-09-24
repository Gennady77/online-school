export interface CourseData {
  id: number,
  title: string,
  date: Date
}

export type JsonResponse<T> = {
  data: T;
}

export type AuthSettings = {
  id: string;
  userEmail: string;
}

export type User = {
  id: number;
  email: string;
  token?: string;
};

export enum COURSE_TYPE {
  ONLINE = 1, OFFLINE= 2
}
