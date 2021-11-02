
import i18next from 'i18next';
import * as React from 'react';

import { Markdown } from '../../components/markdown';
import { PlatformType } from '../../contracts/generated/AssistantApps/Enum/platformType';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { formatDate } from '../../helper/dateHelper';
import { platformToString } from '../../helper/platformHelper';
import { LocaleKey } from '../../localization/LocaleKey';
import { AdditionalInfoChip } from '../common/chip/additionalInfoChip';
import { BottomModalSheet } from '../common/dialog/bottomModalSheet';
import { TextContainer } from '../common/tile/textContainer';

interface IProps {
    version: VersionViewModel;
    currentWhatIsNewGuid: string;
}

interface IState {
    isDetailPaneOpen: boolean
}

export class WhatIsNewListTile extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            isDetailPaneOpen: false,
        }
    }

    toggleIsOpen = (value?: boolean) => {
        this.setState((prevState: IState) => {
            return {
                isDetailPaneOpen: (value != null) ? value : !prevState.isDetailPaneOpen,
            }
        })
    }

    render() {
        const { version, currentWhatIsNewGuid } = this.props;
        return (
            <div className="gen-item-container w-full" draggable={false}>
                <div className="gen-item-content-container pointer" onClick={() => this.toggleIsOpen(true)}>
                    <TextContainer text={i18next.t(LocaleKey.release).replace('{0}', version.buildName)}
                        additionalCss="m-0-child f-1"
                    />
                    <div className="quantity-container mb-2">{formatDate(version.activeDate)}</div>
                    <div className="quantity-container mb-2">{
                        version.platforms.map((p: PlatformType) => {
                            return (
                                <>
                                    <AdditionalInfoChip
                                        key={p}
                                        text={platformToString(p)}
                                        additionalCss="m-0"
                                    />
                                    &nbsp;
                                </>
                            );
                        })
                    }</div>
                    {
                        (version.guid === currentWhatIsNewGuid) &&
                        <div className="ribbon">Current</div>
                    }
                </div>

                <BottomModalSheet
                    isOpen={this.state.isDetailPaneOpen}
                    onClose={() => this.toggleIsOpen(false)}
                    snapPoints={[400]}
                >
                    <div className="container">
                        <div className="row justify pt-3" style={{ textAlign: 'left' }}>
                            <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 col-xs-12">
                                <Markdown markdown={version.markdown} />
                            </div>
                        </div>
                    </div>
                </BottomModalSheet>
            </div>
        );
    }
};