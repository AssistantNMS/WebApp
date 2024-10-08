import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Error } from '../../components/core/error/error';
import { SmallLoading } from '../../components/core/loading/loading';
import { getPatchForExpedition } from '../../constants/Expedition';
import { NetworkState } from '../../constants/NetworkState';
import * as routes from '../../constants/Route';
import { ExpeditionSeason } from '../../contracts/helloGames/expeditionSeason';
import { GameItemService } from '../../services/json/GameItemService';
import { detailsFromExpeditionId } from './expeditionSeasonHelper';

interface IExpeditionSeasonTilesProps {
  gameItemService: GameItemService;
}

export const ExpeditionSeasonTiles: React.FC<IExpeditionSeasonTilesProps> = (props: IExpeditionSeasonTilesProps) => {
  const [pastExpeditions, setPastExpeditions] = useState<Array<ExpeditionSeason>>([]);
  const [pastExpeditionStatus, setPastExpeditionStatus] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    fetchAllPastExpeditions();
  }, []);

  const fetchAllPastExpeditions = async () => {
    const expeditionsResult = await props.gameItemService.getAllSeasonExpeditions();
    if (!expeditionsResult.isSuccess) {
      setPastExpeditions([]);
      setPastExpeditionStatus(NetworkState.Error);
      return;
    }

    setPastExpeditions(expeditionsResult.value.sort((a, b) => (new Date(a.StartDate) > new Date(b.StartDate) ? -1 : 1)));
    setPastExpeditionStatus(NetworkState.Success);
  };

  if (pastExpeditionStatus === NetworkState.Loading) {
    return <SmallLoading />;
  }

  if (pastExpeditionStatus === NetworkState.Error) {
    return <Error />;
  }

  return (
    <div data-id="SeasonExpeditionCards" className="row">
      {(pastExpeditions ?? []).map((data) => {
        const detailsFromId = detailsFromExpeditionId(data);
        return (
          <ExpeditionSeasonTile
            key={data.Id}
            seasonId={data.Id}
            seasonNum={detailsFromId.id}
            name={data.Title}
            icon={getPatchForExpedition(data.Icon)}
            background={detailsFromId.background}
          />
        );
      })}
    </div>
  );
};

interface IExpeditionSeasonTileProps {
  seasonId: string;
  seasonNum: string;
  name: string;
  icon: string;
  background: string;
}

export const ExpeditionSeasonTile: React.FC<IExpeditionSeasonTileProps> = (props: IExpeditionSeasonTileProps) => {
  return (
    <div data-id="SeasonExpeditionCard" className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-xs-12">
      <Link to={`${routes.seasonExpedition}/${props.seasonId}`} className="card exp noselect" draggable={false}>
        <div className="card-image exp">
          <img src={`/${props.background}`} draggable={false} alt={props.name} />
        </div>

        <img src={`/${props.icon}`} className="card-image-overlay" draggable={false} alt={props.name + ' icon'} />

        <div className="card-top-right-content">
          <span>Season {props.seasonNum}</span>
        </div>

        <div className="card-content row">
          <div className="col-12">
            <div className="user-details exp">
              <div className="user-name">
                <h3 style={{ width: '100%', textAlign: 'center' }}>{props.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
