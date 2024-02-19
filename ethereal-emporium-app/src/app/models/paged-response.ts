export type PagedResponse<T> = {
  items: T[];
  limit: number;
  skip: number;
  total: number;
};
