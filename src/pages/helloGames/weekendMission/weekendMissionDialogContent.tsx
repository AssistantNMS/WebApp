import React from 'react';

import { ChatBubblesPresenter } from '../../../components/tilePresenter/chatBubble/chatBubblePresenter';
import { NpcMessageFlows } from '../../../contracts/helloGames/weekendMissionStage';

enum ChatType {
    Outgoing = 0,
    Incoming = 1,
}

interface IChatProps {
    type: ChatType;
    text: string;
}

interface IProps {
    messageFlow: NpcMessageFlows;
}

interface IState {
    currentMessageFlow: NpcMessageFlows;
    messages: Array<IChatProps>;
}

export class WeekendMissionDialogContent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            currentMessageFlow: props.messageFlow,
            messages: this.receivedMessages(props.messageFlow.IncomingMessages),
        };
    }

    receivedMessages = (incomMsgs: Array<string>): Array<IChatProps> => {
        const chatBubbles: Array<IChatProps> = [];
        for (const inc of incomMsgs) {
            chatBubbles.push({
                type: ChatType.Incoming,
                text: inc
            });
        }
        return chatBubbles;
    }

    render() {
        const localChatBubbles: Array<IChatProps> = [...this.state.messages];
        return (
            <>
                <ChatBubblesPresenter chatBubbles={localChatBubbles} />
            </>
        );
    }
}

