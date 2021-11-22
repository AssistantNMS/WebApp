import React, { ReactNode } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const modalSetup = (appId: string) => {
    Modal.setAppElement(`#${appId}`);
    (Modal as any).defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.5)';
}

interface IBaseDialogProps {
    isOpen: boolean;
    children: ReactNode;
    closeModal: () => void;
}

export const BaseDialog: React.FC<IBaseDialogProps> = (props: IBaseDialogProps) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.closeModal}
            style={customStyles}
        >
            {props.children}
        </Modal>
    );
}