import { Result, ResultWithValue } from '../../contracts/results/ResultWithValue';
import { anyObject } from '../../helper/typescriptHacks';

export class BaseApiService {
  private _baseUrl: string = window.config?.apiUrl ?? 'https://nmsassistant.com';
  constructor(newBaseUrl?: string) {
    if (newBaseUrl != null) this._baseUrl = newBaseUrl;
  }

  protected async get<T>(
    url: string,
    manipulateHeaders?: () => { [prop: string]: string },
    manipulateResponse?: (data: Response) => ResultWithValue<T>,
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, options);

      if (manipulateResponse != null) {
        return manipulateResponse(result);
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: '',
    };
  }

  protected async post<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => { [prop: string]: string },
    customMapper?: (data: Response) => ResultWithValue<T>,
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (customMapper != null) {
        return customMapper(result);
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: '',
    };
  }

  protected async put<T, TK>(
    url: string,
    data: TK,
    manipulateHeaders?: () => { [prop: string]: string },
    customMapper?: (data: Response) => ResultWithValue<T>,
  ): Promise<ResultWithValue<T>> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(data),
      });

      if (customMapper != null) {
        return customMapper(result);
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    let resultValue = anyObject;
    try {
      resultValue = await result.json();
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      value: resultValue,
      errorMessage: '',
    };
  }

  protected async delete(url: string, manipulateHeaders?: () => { [prop: string]: string }): Promise<Result> {
    //
    let options = anyObject;
    if (manipulateHeaders != null) {
      options = { ...options, ...manipulateHeaders() };
    }

    let result = anyObject;
    try {
      result = await fetch(`${this._baseUrl}/${url}`, {
        ...options,
        method: 'DELETE',
      });
    } catch (ex) {
      return {
        isSuccess: false,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    try {
      await result.json();
    } catch (ex) {
      return {
        isSuccess: false,
        errorMessage: ex?.toString?.() ?? '',
      };
    }

    return {
      isSuccess: true,
      errorMessage: '',
    };
  }
}
