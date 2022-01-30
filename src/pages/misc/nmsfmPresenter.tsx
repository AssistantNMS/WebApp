import i18next from 'i18next';
import React, { ReactNode } from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';

import { BottomModalSheet } from '../../components/common/dialog/bottomModalSheet';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { CustomTooltip } from '../../components/common/tooltip/tooltip';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NmsfmTrackListTile } from '../../components/tilePresenter/nmsfmTrackListTile';
import { NetworkState } from '../../constants/NetworkState';
import { NmsfmTrackDataViewModel } from '../../contracts/generated/Model/nmsfmTrackDataViewModel';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps {
    trackListIsOpen: boolean;
    toggleTrackListOpen: (value?: boolean) => void;
    trackInfoRows: Array<NmsfmTrackDataViewModel>;
    trackStatus: NetworkState;
}

export const NmsfmPresenter: React.FC<IProps> = (props: IProps) => {

    const renderTrackList = (localProps: IProps): ReactNode => {
        if (localProps.trackStatus === NetworkState.Error) return <Error />
        if (localProps.trackStatus === NetworkState.Loading) return <SmallLoading />

        return (
            <div className="container full pt1">
                <div className="generic-item-list row">
                    <div className="col-12 gen-item mb-5">
                        <GenericListPresenter list={localProps.trackInfoRows} presenter={NmsfmTrackListTile} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <DefaultAnimation>
            <HeadComponent title={`${i18next.t(LocaleKey.nmsfm)} - ${i18next.t(LocaleKey.nmsfmSubtitle)}`} />
            <NavBar title={`${i18next.t(LocaleKey.nmsfm)} - ${i18next.t(LocaleKey.nmsfmSubtitle)}`} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        <div className="col-12">
                            <img src="/assets/images/special/nmsfm.png" alt="nmsfm" style={{ maxHeight: '50vh' }} />
                            <div className="view-queue">
                                <CustomTooltip tooltipText="View tracks" position="left" theme="light">
                                    <i className="material-icons action-icon noselect pointer"
                                        onClick={() => props.toggleTrackListOpen(true)}>queue_music</i>
                                </CustomTooltip>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mt-2 mb-0">{i18next.t(LocaleKey.nmsfm)}</h2>
                            <h3 className="mt-0">{i18next.t(LocaleKey.nmsfmSubtitle)}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <audio controls className="audio">
                                <source src="https://stream.zenolive.com/9kz76c8mdg8uv.aac" type="audio/ogg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ul style={{ listStyleType: 'none' }}>
                                <li className="radio-link">
                                    <hr />
                                    <a href="https://zeno.fm/nms-fm/" style={{ textAlign: 'left' }}>
                                        <h4 className="mb-0"><strong>Zeno Radio</strong></h4>
                                        <p>https://zeno.fm/nms-fm/</p>
                                        <i className="material-icons" style={{ fontSize: '2em' }}>open_in_new</i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <BottomModalSheet
                isOpen={props.trackListIsOpen}
                onClose={() => props.toggleTrackListOpen(false)}
            >
                {renderTrackList(props)}
            </BottomModalSheet>
        </DefaultAnimation>
    );
}
