import Swal from 'sweetalert2';

import { ResultWithValue } from '../contracts/results/ResultWithValue';

export const getQuantityDialog = async (title: string): Promise<ResultWithValue<number>> => {
    const { value: quantity } = await Swal.fire({
        title,
        input: 'number',
        inputValue: '1',
        showCancelButton: true
    });
    if (isNaN(quantity)) return {
        isSuccess: false,
        errorMessage: 'NaN',
        value: 0,
    };

    return {
        isSuccess: true,
        errorMessage: '',
        value: quantity,
    };
}
export const getStringDialog = async (title: string, currentValue: string): Promise<string> => {
    const { value: text } = await Swal.fire({
        title,
        input: 'text',
        inputValue: currentValue,
        showCancelButton: true
    });

    return text;
}
