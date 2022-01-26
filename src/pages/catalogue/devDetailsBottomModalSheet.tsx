import React from 'react';
import { BottomModalSheet } from '../../components/common/dialog/bottomModalSheet';

interface IProps {
    appId: string;
    isDetailPaneOpen: boolean;
    setDetailPaneOpen: (isOpen: boolean) => void;
}

export const DevDetailsBottomModalSheet: React.FC<IProps> = (props: IProps) => {

    return (
        <BottomModalSheet
            isOpen={props.isDetailPaneOpen}
            onClose={() => props.setDetailPaneOpen(false)}
            snapPoints={[600]}
        >
            <div className="content">
                <div className="container full pt1">
                    Hi
                </div>
            </div>
        </BottomModalSheet>
    );
}