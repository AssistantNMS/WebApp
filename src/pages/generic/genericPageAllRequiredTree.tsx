import classNames from 'classnames';
import React, { useState } from 'react';
import { RequiredItemDetailsListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { Tree } from '../../contracts/tree/tree';

interface IProps {
  list: Array<Tree<RequiredItemDetails>>;
}

export const GenericPageAllRequiredTree: React.FC<IProps> = (props: IProps) => {
  return (
    <div className="generic-item-list tree" data-id="GenericPageAllRequiredTree">
      {props.list.map((item: Tree<RequiredItemDetails>, index: number) => (
        <GenericPageAllRequiredTreeItem key={`${item.item.Id}-${index}`} level={1} detail={item} />
      ))}
    </div>
  );
};

interface IGenericPageAllRequiredTreeItemProps {
  detail: Tree<RequiredItemDetails>;
  level: number;
}
export const GenericPageAllRequiredTreeItem: React.FC<IGenericPageAllRequiredTreeItemProps> = (props: IGenericPageAllRequiredTreeItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const hasChildren = props.detail.children.length > 0;
  return (
    <div className="tree-view" data-id="GenericPageAllRequiredTreeItem">
      <div className="tree-view-parent row">
        <div className="tree-view-parent-icon" onClick={() => setIsExpanded(!isExpanded)}>
          {hasChildren ? (
            <i className="material-icons x3">{isExpanded ? 'expand_less' : 'expand_more'}</i>
          ) : (
            <i className="material-icons x3" style={{ opacity: 0 }}>
              hd
            </i>
          )}
        </div>
        <div className="tree-view-parent-content gen-item">
          <RequiredItemDetailsListTile {...props.detail.item} />
        </div>
      </div>
      {hasChildren && (
        <div
          className={classNames('tree-view-children', {
            'is-expanded': isExpanded,
          })}
          style={{ marginLeft: '3em' }}
        >
          {props.detail.children.map((item: Tree<RequiredItemDetails>, index: number) => (
            <GenericPageAllRequiredTreeItem key={`${props.level}-${item.item.Id}-${index}`} level={props.level + 1} detail={item} />
          ))}
        </div>
      )}
    </div>
  );
};
