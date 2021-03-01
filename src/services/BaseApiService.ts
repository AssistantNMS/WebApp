import axios from 'axios';
import { ResultWithValue } from '../contracts/results/ResultWithValue';
import { anyObject } from '../helper/typescriptHacks';

declare global {
  interface Window { config: any }
}

export class BaseApiService {
  private _baseUrl: String = window.config?.apiUrl ?? 'https://nmsassistant.com';
  constructor(newBaseUrl?: String) {
    if (newBaseUrl != null) this._baseUrl = newBaseUrl;
  }
  protected async get<T>(url: string): Promise<ResultWithValue<T>> {
    try {
      const result = await axios.get<T>(`${this._baseUrl}/${url}`);
      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.message
      }
    }
  }

  protected async post<T>(url: string, data: any): Promise<ResultWithValue<T>> {
    try {
      const result = await axios.post<T>(`${this._baseUrl}/${url}`, data);
      return {
        isSuccess: true,
        value: result.data,
        errorMessage: ''
      }
    } catch (ex) {
      return {
        isSuccess: false,
        value: anyObject,
        errorMessage: ex.message
      }
    }
  }
}
