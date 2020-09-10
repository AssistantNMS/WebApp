import React from 'react';
import classNames from 'classnames';

import './_chatBubble.scss';
import { newGuid } from '../../../helper/guidHelper';

enum ChatType {
    Outgoing = 0,
    Incoming = 1,
}

interface IChatProps {
    type: ChatType;
    text: string;
}

interface IProps {
    chatBubbles: Array<IChatProps>;
}

export const ChatBubblesPresenter = (props: IProps) => {
    return (
        <div className="discussion">
            {
                props.chatBubbles.map((item: IChatProps) => {
                    return (
                        <div key={newGuid()} className={classNames("bubble", {
                            sender: item.type === ChatType.Incoming,
                            recipient: item.type === ChatType.Outgoing,
                        })
                        }>
                            {item.text}
                        </div>
                    )
                })
            }
        </div>
    )
}