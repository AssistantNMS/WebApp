import React, { useState } from 'react';

import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { BasicLink } from '../../core/link';
import { BottomModalSheet } from '../../common/dialog/bottomModalSheet';
import { GoodGuyFreeBaitViewModel } from '../../../contracts/generated/Model/goodGuyFreeBaitViewModel';

const GgfDiscordLink: React.FC = () => (<BasicLink href='http://discord.com/users/goodguysfree'>Discord</BasicLink>);
const GgfTwitterLink: React.FC = () => (<BasicLink href='https://x.com/goodguysfree'>Twitter</BasicLink>);
const GgfGoogleSheetLink: React.FC = () => (<BasicLink href='https://docs.google.com/spreadsheets/d/1x9LFIzRIFG8B17wQqDNaD77atbtVtq9YK_PsbIJasiY'>Google Sheet</BasicLink>);

export const GgfInfoAlert: React.FC = () => {
    const infoProvidedByAndOtherArr = translate(LocaleKey.infoProvidedByAndOther).split('{0}');

    return (
        <div className="bait alert alert-warning">
            <h4>
                {infoProvidedByAndOtherArr[0]}
                <span className="secondary-colour">GoodGuysFree, PureCalamity, Lowe Gotembomrek</span>
                {infoProvidedByAndOtherArr[1]}
            </h4>
            <span>
                {translate(LocaleKey.contributeToExternalInfo)}&nbsp;
                <GgfDiscordLink />&nbsp;or&nbsp;
                <GgfTwitterLink />
            </span>
        </div>
    );
};

interface IGgfInfoModalProps {
    bait: GoodGuyFreeBaitViewModel;
}
export const GgfInfoModal: React.FC<IGgfInfoModalProps> = (props: IGgfInfoModalProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const onBgClick = (event: any) => {
        event?.preventDefault?.();
    }

    const onActionClick = (event: any) => {
        event?.preventDefault?.();
        setIsOpen(true);
    }

    const renderContent = () => {
        if (isOpen !== true) return <div></div>;

        const infoProvidedByAndOtherArr = translate(LocaleKey.infoProvidedByAndOther).split('{0}');
        return (
            <>
                <h4>
                    {infoProvidedByAndOtherArr[0]}
                    <span className="secondary-colour">GoodGuysFree, PureCalamity, Lowe Gotembomrek</span>
                    {infoProvidedByAndOtherArr[1]}
                </h4>
                <span>
                    {translate(LocaleKey.contributeToExternalInfo)}&nbsp;
                    <GgfDiscordLink />&nbsp;or&nbsp;
                    <GgfTwitterLink />
                </span>
                <div className="row justify">
                    <div className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <br />
                        <table className="table table-bordered" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <td><b>{translate(LocaleKey.rarity)}</b></td>
                                    <td><b>{translate(LocaleKey.size)}</b></td>
                                    <td><b>{translate(LocaleKey.usedToCreate)}</b></td>
                                    <td><b>Average</b></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.bait.rarity} %</td>
                                    <td>{props.bait.size} %</td>
                                    <td>{props.bait.usedFor}</td>
                                    <td>{props.bait.average} %</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                View <GgfGoogleSheetLink />
            </>
        );
    }

    return (
        <>
            <i key="info" className="material-icons x2 mr0" onClick={onActionClick}>
                info_outline
            </i>
            <div data-id="bg-click" onClick={onBgClick}>
                <BottomModalSheet isOpen={isOpen} onClose={() => setIsOpen(false)} snapPoints={[400]}>
                    <div className="content">
                        <div className="container full pt1">{renderContent()}</div>
                    </div>
                </BottomModalSheet>
            </div>
        </>
    );
};
