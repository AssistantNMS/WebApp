export interface Result {
  isSuccess: boolean;
  errorMessage: string;
}

export interface ResultWithValue<T> extends Result {
  value: T;
}
