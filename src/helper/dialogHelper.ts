import Swal from 'sweetalert2';

import { ResultWithValue } from '../contracts/results/ResultWithValue';

export const getQuantityDialog = async (title: string, defaultValue?: number): Promise<ResultWithValue<number>> => {
  const { value: quantity } = await Swal.fire({
    title,
    input: 'number',
    inputValue: defaultValue != null ? defaultValue.toString() : '1',
    showCancelButton: true,
  });
  if (isNaN(quantity))
    return {
      isSuccess: false,
      errorMessage: 'NaN',
      value: 0,
    };

  return {
    isSuccess: true,
    errorMessage: '',
    value: quantity,
  };
};

export const getStringDialog = async (title: string, currentValue: string): Promise<string> => {
  const { value: text } = await Swal.fire({
    title,
    input: 'text',
    inputValue: currentValue,
    showCancelButton: true,
  });

  return text;
};

export const successDialog = async (title: string, description?: string) => {
  Swal.fire({ icon: 'success', title, text: description });
};

export const errorDialog = async (title: string, description?: string) => {
  Swal.fire({ icon: 'error', title, text: description });
};
