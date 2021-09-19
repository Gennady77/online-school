export interface CourseData {
  id: number,
  title: string,
  date: Date
}

export type JsonResponse<T> = {
  data: T;
}
