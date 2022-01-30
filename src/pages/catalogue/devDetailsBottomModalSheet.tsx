import React, { useEffect, useState } from 'react';
import { BottomModalSheet } from '../../components/common/dialog/bottomModalSheet';
import { Error } from '../../components/core/error/error';
import { TileLoading } from '../../components/core/loading/loading';
import { NetworkState } from '../../constants/NetworkState';
import { DevDetail } from '../../contracts/data/devDetail';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IProps {
    appId: string;
    isDetailPaneOpen: boolean;
    dataJsonService: DataJsonService;
    setDetailPaneOpen: (isOpen: boolean) => void;
}

export const DevDetailsBottomModalSheet: React.FC<IProps> = (props: IProps) => {
    const [item, setItem] = useState<DevDetail>();
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchData(props.appId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async (itemId: string) => {
        const devResult: ResultWithValue<Array<DevDetail>> = await props.dataJsonService.getDeveloperDetails();
        if (devResult.isSuccess === false) {
            setNetworkState(NetworkState.Error);
            return;
        }

        let devData: DevDetail | undefined;
        for (const devItem of devResult.value) {
            if (devItem.Id === itemId) {
                devData = devItem;
                break;
            }
        }

        if (devData != null) {
            setItem(devData);
            setNetworkState(NetworkState.Success);
            return;
        }
        setNetworkState(NetworkState.Error);
    }

    const renderContent = () => {
        if (networkState === NetworkState.Loading) {
            return (<TileLoading />);
        }
        if (networkState === NetworkState.Error) {
            return (<Error />);
        }

        const details = [];
        details.push(<>

        </>);
        return (
            <>
                {

                }
            </>
        );
    }

    return (
        <BottomModalSheet
            isOpen={props.isDetailPaneOpen}
            onClose={() => props.setDetailPaneOpen(false)}
            snapPoints={[600]}
        >
            <div className="content">
                <div className="container full pt1">
                    <div className="row">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </BottomModalSheet>
    );
}