
import * as React from 'react';
import classNames from 'classnames';
import { useState } from 'react';
import { LocaleKey } from '../../../localization/LocaleKey';
import { PositiveButton } from '../button/positiveButton';
import { translate } from '../../../localization/Translate';

interface IProps<T> {
    hideViewMoreButton?: boolean;
    isCentered?: boolean;
    list: Array<T>;
    limitResultsTo?: number;
    bootstrapClasses?: string;
    identifier?: (props: T) => string;
    presenter: (props: T, index: number) => JSX.Element;
}

export const defaultGenericListPresenterClasses = 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12';

export function GenericListPresenter<T>(props: IProps<T>) {
    const [showMore, setShowMore] = useState<boolean>(false);

    const bootstrapClasses = props.bootstrapClasses || defaultGenericListPresenterClasses;
    const safeList = (props.list ?? []);
    const list = safeList.slice(0, showMore
        ? safeList.length
        : (props.limitResultsTo ?? safeList.length)
    );

    const renderShowHideMore = (localList: Array<T>) => {
        if (props.limitResultsTo == null || localList.length <= props.limitResultsTo || props.hideViewMoreButton === true) {
            return (<span></span>);
        }

        if (showMore) {
            // TODO translate
            return (
                <div className="col-12 mt-1em">
                    <PositiveButton onClick={() => setShowMore(false)}>
                        Show Less
                    </PositiveButton>
                </div>
            );
        } else {
            const xRecordsLeft = (localList.length - props.limitResultsTo).toString();
            return (
                <div className="col-12 mt-1em">
                    <PositiveButton onClick={() => setShowMore(true)}>
                        {translate(LocaleKey.viewXMore).replace('{0}', xRecordsLeft)}
                    </PositiveButton>
                </div>
            );
        }
    }

    return (
        <div className={classNames('generic-item-list row', { justify: props.isCentered })}>
            {
                list.map((item: T, index: number) => {
                    const key = props.identifier != null ? props.identifier(item) : index;
                    return (
                        <div key={`generic-item-list ${index} ${key}`} data-key={key} className={classNames('gen-item', bootstrapClasses)}>
                            {props.presenter(item, index)}
                        </div>
                    )
                })
            }
            {renderShowHideMore(safeList)}
        </div>
    );
}

