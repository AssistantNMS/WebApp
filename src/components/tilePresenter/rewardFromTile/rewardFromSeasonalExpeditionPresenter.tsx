
import { translate } from '../../../localization/Translate';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NetworkState } from '../../../constants/NetworkState';
import { seasonExpedition } from '../../../constants/Route';
import { ExpeditionSeason } from '../../../contracts/helloGames/expeditionSeason';
import { anyObject } from '../../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { GameItemService } from '../../../services/json/GameItemService';
import { ImageContainer } from '../../common/tile/imageContainer';
import { TextContainer } from '../../common/tile/textContainer';
import { TileLoading } from '../../core/loading/loading';

interface IWithDepInj {
    gameItemService: GameItemService;
}

interface IWithoutDepInj {
    seasId: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const RewardFromSeasonalExpeditionTileClass: React.FC<IProps> = (props: IProps) => {
    const [expedition, setExpedition] = useState<ExpeditionSeason>();
    const [expeditionStatus, setExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchExpeditionData(props.seasId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchExpeditionData = async (seasId: string) => {
        const expeditionsResult = await props.gameItemService.getAllSeasonExpeditions();
        if (!expeditionsResult.isSuccess) {
            setExpedition(anyObject);
            setExpeditionStatus(NetworkState.Error);
            return;
        }

        let found = false;
        for (const exp of expeditionsResult.value) {
            if (exp.Id === seasId) {
                found = true;
                setExpedition(exp);
                setExpeditionStatus(NetworkState.Success);
                break;
            }
        }

        if (!found) {
            setExpedition(anyObject);
            setExpeditionStatus(NetworkState.Error);
        }
    }

    if (expeditionStatus === NetworkState.Error || expedition == null) return <span></span>;

    if (expeditionStatus === NetworkState.Loading) {
        return (<TileLoading />);
    }

    return (
        <Link to={`${seasonExpedition}/${props.seasId}`} data-id="RewardFromSeasonalExpeditionTile" className="gen-item-container" draggable={false}>
            <ImageContainer Name={expedition.Title} Icon={expedition.Icon} />
            <div className="gen-item-content-container">
                <TextContainer text={expedition.Title} />
                <div className="quantity-container">
                    {translate(LocaleKey.seasonalExpeditionSeasons)}
                </div>
            </div>
        </Link>
    );
}

const RewardFromSeasonalExpeditionTileClassWithDepInj = withServices<IWithoutDepInj, IWithDepInj>(
    RewardFromSeasonalExpeditionTileClass,
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

export const RewardFromSeasonalExpeditionTile = (props: IWithoutDepInj): JSX.Element => (
    <RewardFromSeasonalExpeditionTileClassWithDepInj {...props} />
);