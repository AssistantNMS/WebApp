import React, { useState } from "react";
import { BottomModalSheet } from '../dialog/bottomModalSheet';
import { AssistantAppsContent } from './assistantAppsContent';

interface IProps {
}

export const AssistantAppsAboutDrawerTilePresenter: React.FC<IProps> = (props: IProps) => {
    const [isDetailPaneOpen, setDetailPaneOpen] = useState<boolean>(false);

    const toggleOpenModal = (e: any) => {
        e?.preventDefault?.();
        setDetailPaneOpen(!isDetailPaneOpen)
    }

    return (
        <>
            <li className="nav-item" draggable="false" onClick={toggleOpenModal}>
                <a href="https://assistantapps.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                    <img className="custom-icons" src="/assets/images/assistantApps.png" alt="/assets/images/assistantApps.png" />
                    <p>AssistantApps</p>
                </a>
            </li>
            <BottomModalSheet
                isOpen={isDetailPaneOpen}
                onClose={() => setDetailPaneOpen(false)}
                snapPoints={[600]}
            >
                <div className="container">
                    <AssistantAppsContent />
                </div>
            </BottomModalSheet>
        </>
    );
}
