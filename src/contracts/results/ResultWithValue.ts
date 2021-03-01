export interface Result {
  isSuccess: boolean;
  errorMessage: string;
}

export interface ResultWithValue<T> extends Result {
  value: T;
}


export interface ResultWithValueAndPagination<T> extends ResultWithValue<T> {
  currentPage: number;
  totalPages: number;
  totalRows: number;
}
