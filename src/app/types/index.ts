export type JsonResponse<T> = {
  data: T;
}

export type JsonErrorResponse = {
  error: string;
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

export type CourseData = {
  courseId: number;
  courseName: string;
  courseDate: number;
  courseDuration: number;
  courseType: number;
  courseUrl: string | null;
  coursePlaceBuilding: number | null;
  coursePlaceRoom: number | null;
  courseComment: string;
}

export type CourseRequest = CourseData | {userId: number};
