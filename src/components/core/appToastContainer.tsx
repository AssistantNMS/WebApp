
import React from 'react';
import { ToastContainer } from 'react-toastify';

interface IProps { }

export const AppToastContainer: React.FC<IProps> = (props: IProps) => {
    return (
        <ToastContainer
            position="bottom-right"
            theme="colored"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
        />
    );
}

