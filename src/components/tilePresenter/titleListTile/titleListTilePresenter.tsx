
import * as React from 'react';

import { TextContainer } from '../../common/tile/textContainer';
import { ImageContainer } from '../../common/tile/imageContainer';
import { ActionContainer } from '../../common/tile/actionContainer';
import { TitleData } from '../../../contracts/TitleData';

interface IProps extends TitleData {
    isOwned: boolean;
    playerName?: string;
    addToOwned?: (itemId: string) => void;
    removeFromOwned?: (itemId: string) => void;
}
export const TitleItemListTile: React.FC<IProps> = (props: IProps) => {
    const getActions = () => {
        const result = [
            (props.isOwned
                ? <i key="markAsUnOwned" className="material-icons">check_box</i>
                : <i key="markAsOwned" className="material-icons">check_box_outline_blank</i>
            ),
            (<i key="spacer">&nbsp;</i>),
        ];
        return result;
    }

    const handleClick = () => {
        if (props.isOwned) {
            props.removeFromOwned?.(props.Id);
        }
        else {
            props.addToOwned?.(props.Id);
        }
    }

    const title = props.Title.replace('{0}', props.playerName ?? 'Unknown');
    const descrip = props.Description.replace('%NUM%', props.UnlockedByStatValue?.toString?.() ?? '');
    return (
        <div data-id="TitleItemListTile" className="gen-item-container title-item pointer"
            onClick={handleClick} draggable={false}
        >
            <ImageContainer Icon={props.AppIcon} Name={props.Title} />
            <div className="gen-item-content-container">
                <TextContainer text={title} additionalCss="pt2 action-container-space" />
                <div className="quantity-container">{descrip}</div>
                <ActionContainer actions={getActions()} />
            </div>
        </div>
    );
}
