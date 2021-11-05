
import * as React from 'react';
import classNames from 'classnames';
import { useState } from 'react';
import i18next from 'i18next';
import { LocaleKey } from '../../../localization/LocaleKey';
import { PositiveButton } from '../button/positiveButton';

interface IProps<T> {
    isCentered?: boolean;
    list: Array<T>;
    limitResultsTo?: number;
    bootstrapClasses?: string;
    identifier?: (props: T) => string;
    presenter: (props: T, index: number) => JSX.Element;
}

export function GenericListPresenter<T>(props: IProps<T>) {
    const [showMore, setShowMore] = useState<boolean>(false);

    const bootstrapClasses = props.bootstrapClasses || 'col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12';
    const list = props.list.slice(0, showMore
        ? props.list.length
        : (props.limitResultsTo ?? props.list.length)
    );

    const renderShowHideMore = () => {
        if (props.limitResultsTo == null || props.list.length < props.limitResultsTo) {
            return (<span></span>);
        }

        if (showMore) {
            // TODO translate
            return (
                <PositiveButton onClick={() => setShowMore(false)}>
                    Show Less
                </PositiveButton>
            );
        } else {
            const xRecordsLeft = (props.list.length - props.limitResultsTo).toString();
            return (
                <PositiveButton onClick={() => setShowMore(true)}>
                    {i18next.t(LocaleKey.viewXMore).replace('{0}', xRecordsLeft)}
                </PositiveButton>
            );
        }
    }

    return (
        <div className={classNames('generic-item-list row', { justify: props.isCentered })}>
            {
                list.map((item: T, index: number) => {
                    const key = props.identifier ? props.identifier(item) : '';
                    return (
                        <div key={`generic-item-list ${index} ${key}`} data-key={key} className={classNames('gen-item', bootstrapClasses)}>
                            {props.presenter(item, index)}
                        </div>
                    )
                })
            }
            <div className="col-12 mt-1em">
                {renderShowHideMore()}
            </div>
        </div>
    );
}

