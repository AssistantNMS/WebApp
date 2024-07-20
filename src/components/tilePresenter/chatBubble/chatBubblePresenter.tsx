import React from 'react';
import classNames from 'classnames';

import './_chatBubble.scss';
import { newGuid } from '../../../helper/guidHelper';

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
  chatBubbles: Array<IChatProps>;
}

export const ChatBubblesPresenter: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="discussion pb-2">
      {props.chatBubbles.map((item: IChatProps) => {
        return (
          <div
            key={newGuid()}
            className={classNames('bubble', {
              sender: item.type === ChatType.Incoming,
              recipient: item.type === ChatType.Outgoing,
              option: item.type === ChatType.Options,
              noselect: item.type === ChatType.Options,
              pointer: item.type === ChatType.Options,
            })}
            onClick={() => (item.onClick != null ? item.onClick() : null)}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};
