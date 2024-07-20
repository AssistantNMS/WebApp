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
    backgroundColor: '#4a4a4a',
    borderColor: '#AAA',
  },
};

export const modalSetup = (appId: string) => {
  Modal.setAppElement(`#${appId}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Modal as any).defaultStyles.overlay.backgroundColor = 'rgba(0,0,0,0.5)';
};

interface IBaseDialogProps {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export const BaseDialog: React.FC<IBaseDialogProps> = (props: IBaseDialogProps) => {
  return (
    <Modal isOpen={props.isOpen} onRequestClose={props.closeModal} style={customStyles}>
      {props.children}
    </Modal>
  );
};
