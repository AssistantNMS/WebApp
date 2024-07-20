import { LOADING } from './type';

export const setLoadingStatus = (isLoading: boolean, text?: string) => {
  return {
    isLoading,
    text: text || 'Loading',
    type: LOADING,
  };
};
