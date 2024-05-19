export interface ResponseForm<T> {
  code: number;
  message: string;
  data: T;
  version: string;
}
