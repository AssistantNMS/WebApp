import React, { useEffect, useState } from 'react';

import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { StarshipScrap, StarshipScrapItemDetail } from '../../contracts/data/starshipScrap';
import { DataJsonService } from '../../services/json/DataJsonService';
import { StarshipScrapItemDetailListTile, StarshipScrapListTile } from '../../components/tilePresenter/starshipScrapListTile';
import { TextContainer } from '../../components/common/tile/textContainer';

interface IWithDepInj {
    dataService: DataJsonService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj { }


export const StarshipScrapPageUnconnected: React.FC<IProps> = (props: IProps) => {
    const [starshipScrapItems, setStarshipScrapItems] = useState<Array<StarshipScrap>>([]);
    const [isExpanded, setExpanded] = useState<string>();
    const [networkStatus, setStatus] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        fetchStarshipScrap();
        // eslint-disable-next-line
    }, []);

    const fetchStarshipScrap = async () => {
        const starshipScrapData = await props.dataService.getStarshipScrapData();
        if (!starshipScrapData.isSuccess) {
            setStarshipScrapItems([]);
            setStatus(NetworkState.Error);
            return;
        }

        setStarshipScrapItems(starshipScrapData.value);
        setStatus(NetworkState.Success);
    }

    const displayComunityLinks = (localStarshipScrapItems: Array<StarshipScrap>) => {

        if (networkStatus === NetworkState.Loading) {
            return <SmallLoading />
        }

        if (networkStatus === NetworkState.Error) {
            return <Error />
        }

        if (localStarshipScrapItems == null || localStarshipScrapItems.length === 0) return (
            <h2>{translate(LocaleKey.noItems)}</h2>
        );

        return (
            <div className="generic-item-list">
                {
                    localStarshipScrapItems.map((star: StarshipScrap, index: number) => {
                        const scrapKey = `${star.ShipType}:${star.ShipClassType}`;
                        const currentIsExpanded = isExpanded === scrapKey;
                        return (
                            <div className="row pb1" data-key={scrapKey}>
                                <div className="gen-item col-3">
                                    <StarshipScrapListTile
                                        scrap={star}
                                        index={index}
                                        isExpanded={currentIsExpanded}
                                        setIsExpanded={(newVal: boolean) => {
                                            if (newVal === false) {
                                                setExpanded('');
                                            }
                                            else {
                                                setExpanded(scrapKey);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="gen-item col-9">
                                    <div className="row">
                                        {
                                            (currentIsExpanded ? star.ItemDetails : star.ItemDetails.slice(0, 2)).map((item: StarshipScrapItemDetail, index: number) => (
                                                <div className="gen-item col-4">
                                                    <StarshipScrapItemDetailListTile
                                                        details={item}
                                                        index={index}
                                                    />
                                                </div>
                                            ))
                                        }
                                        {
                                            (currentIsExpanded === false) && (
                                                <div className="gen-item col-4">
                                                    <div className="gen-item-container pointer" draggable={false} onClick={() => setExpanded(scrapKey)}>
                                                        <div className="gen-item-content-container">
                                                            <TextContainer text={translate(LocaleKey.viewXMore).replace('{0}', (star.ItemDetails.length - 2).toString())} additionalCss="full" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-12">
                                    <hr />
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        );
    };

    const title = translate(LocaleKey.starshipScrap);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div data-id="StarshipScrapPage" className="content">
                <div className="row full pt1 pb5">
                    <div className="col-12">
                        {displayComunityLinks(starshipScrapItems)}
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}

export const StarshipScrapPage = withServices<IWithoutDepInj, IWithDepInj>(
    StarshipScrapPageUnconnected,
    (services: IDependencyInjection) => ({
        dataService: services.dataJsonService,
    })
);
