import classNames from 'classnames';
import { translate } from '../../localization/Translate';
import React, { ReactNode, useState } from 'react';
import { RequiredItemListTile } from '../../components/tilePresenter/requiredItemListTile/requiredItemListTile';
import { AppImage } from '../../constants/AppImage';
import { CurrencyType, TechTree, TechTreeNode, UnlockableTechTree } from '../../contracts/tree/techTree';
import { LocaleKey } from '../../localization/LocaleKey';

interface IUnlockableTreesProps {
    trees: Array<UnlockableTechTree>
}
export const UnlockableTreesRenderer: React.FC<IUnlockableTreesProps> = (props: IUnlockableTreesProps) => {
    if (props.trees == null || props.trees.length < 1) return <p>{translate(LocaleKey.noItems)}</p>;

    return (
        <div className="tree-view generic-item-list tree p1" data-key="unlockableTreeRenderer" >
            {
                (props.trees ?? []).map((tree, indx) => (
                    <UnlockableTreeRenderer
                        key={`unlockableTreeRenderer ${indx} ${tree.Id}`}
                        tree={tree}
                    />
                ))
            }
        </div>
    );
}

interface IUnlockableTreeProps {
    tree: UnlockableTechTree
}
export const UnlockableTreeRenderer: React.FC<IUnlockableTreeProps> = (props: IUnlockableTreeProps) => {
    const hasChildren = (props.tree.Trees.length > 0);
    return (
        <ExpandableRow
            key={props.tree.Id}
            dataKey={props.tree.Id}
            hasChildren={hasChildren}
            headerChildren={<h3>{props.tree.Name}</h3>}
        >
            <TechTreesRenderer trees={props.tree.Trees} />
        </ExpandableRow>
    );
}

interface ITechTreesProps {
    trees: Array<TechTree>
}
export const TechTreesRenderer: React.FC<ITechTreesProps> = (props: ITechTreesProps) => {
    return (
        <div data-key="TechTreesRenderer" className="tree-view">
            {
                (props.trees ?? []).map((tree, indx) => (
                    <TechTreeRenderer
                        key={`TechTreesRenderer ${indx} ${tree.Id}`}
                        tree={tree}
                    />
                ))
            }
        </div>
    );
}

interface ITechTreeProps {
    tree: TechTree
}
export const TechTreeRenderer: React.FC<ITechTreeProps> = (props: ITechTreeProps) => {
    const hasChildren = (props.tree.Children.length > 0);
    return (
        <ExpandableRow
            key={props.tree.Id}
            dataKey={props.tree.Id}
            hasChildren={hasChildren}
            headerChildren={<h3>{props.tree.Name}</h3>}
        >
            <TechTreeNodesRenderer
                trees={props.tree.Children}
                costType={props.tree.CostType}
            />
        </ExpandableRow>
    );
}

interface ITechTreeNodesProps {
    costType: CurrencyType;
    trees: Array<TechTreeNode>
}
export const TechTreeNodesRenderer: React.FC<ITechTreeNodesProps> = (props: ITechTreeNodesProps) => {
    return (
        <div data-key="TechTreesRenderer" >
            {
                (props.trees ?? []).map((tree, indx) => (
                    <TechTreeNodeRenderer
                        key={`TechTreeNodesRenderer ${indx} ${tree.Id}`}
                        costType={props.costType}
                        tree={tree}
                    />
                ))
            }
        </div>
    );
}

interface ITechTreeNodeProps {
    costType: CurrencyType;
    tree: TechTreeNode;
}
export const TechTreeNodeRenderer: React.FC<ITechTreeNodeProps> = (props: ITechTreeNodeProps) => {
    const hasChildren = (props.tree.Children.length > 0);
    let costTypeString = '';
    let costReactNode: ReactNode | undefined;
    const costType: any = CurrencyType[props.costType];
    if (costType === Number(CurrencyType.Nanites)) {
        costTypeString = 'Nanites';
        costReactNode = (<img src={AppImage.nanites} className="tiny" alt={costTypeString} draggable={false} />);
    }
    if (costType === Number(CurrencyType.SalvagedData)) {
        costTypeString = 'Salvaged Data';
        costReactNode = (<img src={AppImage.salvagedData} className="tiny" alt={costTypeString} draggable={false} />);
    }
    if (costType === Number(CurrencyType.FactoryOverride)) {
        costTypeString = 'Factory Override';
        costReactNode = (<img src={AppImage.factoryOverride} className="tiny" alt={costTypeString} draggable={false} />);
    }

    return (
        <ExpandableRow
            key={props.tree.Id}
            dataKey={props.tree.Id}
            hasChildren={hasChildren}
            headerChildren={
                <RequiredItemListTile
                    Id={props.tree.Id}
                    Quantity={props.tree.Cost}
                    quantityLabel={costTypeString}
                    quantityIconSuffix={costReactNode}
                />
            }
        >
            {
                props.tree.Children.map((child, indx) => (
                    <TechTreeNodeRenderer
                        key={`TechTreeNodeRenderer ${indx} ${child.Id}`}
                        costType={props.costType}
                        tree={child}
                    />
                ))
            }
        </ExpandableRow>
    );
}


interface IExpandableRowProps {
    dataKey: string;
    headerChildren: ReactNode;
    hasChildren: boolean;
    children: ReactNode;
}
export const ExpandableRow: React.FC<IExpandableRowProps> = (props: IExpandableRowProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    return (
        <React.Fragment key={props.dataKey}>
            <div className="tree-view-parent row">
                <div className="tree-view-parent-icon" onClick={() => setIsExpanded(!isExpanded)}>
                    {
                        props.hasChildren
                            ? (<i className="material-icons x3">{isExpanded ? 'expand_less' : 'expand_more'}</i>)
                            : (<i className="material-icons x3" style={{ opacity: 0 }}>hd</i>)
                    }
                </div>
                <div className="tree-view-parent-content gen-item">
                    {props.headerChildren}
                </div>
            </div>
            {
                (props.hasChildren && isExpanded) &&
                (
                    <div className={classNames('tree-view-children', { 'is-expanded': isExpanded })} style={{ marginLeft: '3em' }}>
                        {props.children}
                    </div>
                )
            }
        </React.Fragment>
    );
}