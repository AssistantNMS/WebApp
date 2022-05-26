import React, { useEffect, useState } from 'react';
import { BottomModalSheet } from '../../components/common/dialog/bottomModalSheet';
import { Error } from '../../components/core/error/error';
import { TileLoading } from '../../components/core/loading/loading';
import { NetworkState } from '../../constants/NetworkState';
import { DevDetail } from '../../contracts/data/devDetail';
import { ResultWithValue } from '../../contracts/results/ResultWithValue';
import { DataJsonService } from '../../services/json/DataJsonService';
import { DevPropertyType } from '../../constants/DevProperty';
import { ColourSwatch } from '../../components/common/colourSwatch';

interface IProps {
    appId: string;
    isDetailPaneOpen: boolean;
    dataJsonService: DataJsonService;
    setDetailPaneOpen: (isOpen: boolean) => void;
}

export const DevDetailsBottomModalSheet: React.FC<IProps> = (props: IProps) => {
    const [devItem, setDevItem] = useState<DevDetail>();
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
            setDevItem(devData);
            setNetworkState(NetworkState.Success);
            return;
        }
        setNetworkState(NetworkState.Error);
    }

    const renderContent = (devDetail: DevDetail | undefined) => {
        if (networkState === NetworkState.Loading) {
            return (<TileLoading />);
        }
        if (networkState === NetworkState.Error || devDetail == null) {
            return (<div className="col-12"><Error /></div>);
        }

        const details = [];
        for (let devPropIndex = 0; devPropIndex < devDetail.Properties.length; devPropIndex++) {
            const devProp = devDetail.Properties[devPropIndex];

            details.push(<React.Fragment key={`frag-${devProp.Type}-${devProp.Name}-${devProp.Value}`}>
                <p key={`${devProp.Type}-${devProp.Name}-${devProp.Value}`}>
                    <b>{devProp.Name}:&nbsp;&nbsp;</b>{devProp.Value}
                    {(devProp.Type === DevPropertyType.Colour) && <ColourSwatch hex={devProp.Value} />}
                </p>
                {(devPropIndex < (devDetail.Properties.length - 1)) && <hr />}
            </React.Fragment>);
        }

        return (
            <>
                <div className="col-12">
                    {details}
                </div>
                <div className="col-12">
                    <br /><br />
                </div>
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
                        {renderContent(devItem)}
                    </div>
                </div>
            </div>
        </BottomModalSheet>
    );
}