import React from 'react';
import { NetworkState } from '../../constants/NetworkState';
import { NmsfmTrackDataViewModel } from '../../contracts/generated/Model/nmsfmTrackDataViewModel';
import { IServices, withServices } from '../../components/core/servicesProvider';
import { NmsfmPresenter } from './nmsfmPresenter';

interface IProps {
    services: IServices;
}

interface IState {
    trackListIsOpen: boolean;
    trackStatus: NetworkState;
    trackInfoRows: Array<NmsfmTrackDataViewModel>;
}

export class NmsfmContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            trackInfoRows: [],
            trackListIsOpen: false,
            trackStatus: NetworkState.Loading,
        };
        this.fetchTrackData();
    }

    fetchTrackData = async () => {
        var nmsfmListResult = await this.props.services.apiService.getNmsfm();
        if (!nmsfmListResult.isSuccess) {
            this.setState(() => {
                return {
                    trackStatus: NetworkState.Error
                }
            });
            return;
        }
        this.setState(() => {
            return {
                trackInfoRows: nmsfmListResult.value,
                trackStatus: NetworkState.Success
            }
        });
    }

    toggleTrackListOpen = (value?: boolean) => {
        this.setState((prevState: IState) => {
            return {
                trackListIsOpen: (value != null) ? value : !prevState.trackListIsOpen,
            }
        })
    }

    render() {
        return (
            <NmsfmPresenter {...this.state}
                toggleTrackListOpen={this.toggleTrackListOpen}
            />
        );
    }
}

export const NmsfmContainer = withServices(NmsfmContainerUnconnected);
