import React from 'react';

import { ChatBubblesPresenter } from '../../../components/tilePresenter/chatBubble/chatBubblePresenter';
import { NpcMessageFlows } from '../../../contracts/helloGames/weekendMissionStage';
import { BaseFloatingActionButton } from '../../../components/floatingActionButton/baseFloatingActionButton';

enum ChatType {
  Outgoing = 0,
  Incoming = 1,
  Options = 2,
}

interface IChatProps {
  type: ChatType;
  text: string;
  onClick?: () => void;
}

interface IProps {
  messageFlow: NpcMessageFlows;
  close?: () => void;
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
        text: inc,
      });
    }
    return chatBubbles;
  };

  render() {
    const localChatBubbles: Array<IChatProps> = [...this.state.messages];
    for (const opt of this.state.currentMessageFlow.Options) {
      localChatBubbles.push({
        type: ChatType.Options,
        text: opt.Name,
        onClick: () => {
          const msgToSend = { type: ChatType.Outgoing, text: opt.Name };
          this.setState(() => {
            return {
              messages: [...this.state.messages, msgToSend, ...this.receivedMessages(opt.IfSelected.IncomingMessages)],
              currentMessageFlow: opt.IfSelected,
            };
          });
        },
      });
    }
    return (
      <>
        <ChatBubblesPresenter chatBubbles={localChatBubbles} />
        {this.state.currentMessageFlow.Options == null || this.state.currentMessageFlow.Options.length === 0 ? (
          <BaseFloatingActionButton
            keyString="close-chat"
            icon={
              <i className="material-icons">
                <i className="material-icons">close</i>
              </i>
            }
            onClick={() => this.props.close?.()}
          />
        ) : null}
      </>
    );
  }
}
