import React, { ReactNode } from 'react';
import { BottomModalSheetImpl } from './bottomModalSheetImpl';

interface IProps {
    isOpen: boolean;
    children: ReactNode;
    snapPoints?: Array<number>;
    className?: string;
    onClose: () => void;
}

export const BottomModalSheet = (props: IProps) => {
    const newProps = { ...props };
    newProps.snapPoints = props.snapPoints ?? [600];
    return (<BottomModalSheetImpl {...newProps} />);
}
