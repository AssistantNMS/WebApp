import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { GameItemModel } from '../../contracts/GameItemModel';
import { RequiredItemDetails } from '../../contracts/RequiredItemDetails';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import State from '../../redux/state';
import { GameItemService } from '../../services/json/GameItemService';
import { getMaxPowerThatCanBeStored, getMinimumAmountOfBatteries, getMinimumAmountOfSolarPanels, getSolarPowerDay, getSolarPowerNight, getSolarPowerSunrise, getSolarPowerSunsest } from './solarPanelCalcs';
import { InGameInfoTable, RealTimeInfoTable, minimumPanelsAndBatteries, recommendedPanelsAndBatteries } from './solarPanelComponents';
import { minimumSummaryTable, recommendedSummaryTable, totalPowerConsumedTable, totalSolarProducedTable } from './solarPanelTables';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { BasicLink } from '../../components/core/link';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { TextContainer } from '../../components/common/tile/textContainer';
import { ActionContainer } from '../../components/common/tile/actionContainer';

const _solarPanelId = 'conTech50';
const _batteryId = 'conTech57';

interface IReduxProps {
    selectedLanguage: string;
}
interface IWithDepInj {
    gameItemService: GameItemService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

const SolarPanelPageConnected: React.FC<IProps> = (props: IProps) => {
    const [requiredKP, setRequiredKP] = useState<number>();
    const [solarPanelDetails, setSolarPanelDetails] = useState<GameItemModel>();
    const [batteryDetails, setBatteryDetails] = useState<GameItemModel>();
    const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);

    useEffect(() => {
        initItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initItems = async () => {
        const solarPanelTask = props.gameItemService.getItemDetails(_solarPanelId).then(item => {
            if (item.isSuccess === false) return;
            setSolarPanelDetails(item.value);
        });
        const batteryTask = props.gameItemService.getItemDetails(_batteryId).then(item => {
            if (item.isSuccess === false) return;
            setBatteryDetails(item.value);
        });

        await Promise.all([solarPanelTask, batteryTask]);

        setNetworkState(NetworkState.Success)
    }

    const onSearchTextChange = (e: any) => {
        e?.persist?.();

        const searchValue = e?.target?.value || '';
        if (requiredKP === searchValue) return;

        setRequiredKP(searchValue);
    }

    const renderMinimumRequirements = (localRequiredKP: number) => {
        const minSolarPanels = getMinimumAmountOfSolarPanels(localRequiredKP);
        const minBatteries = getMinimumAmountOfBatteries(localRequiredKP);

        let solarPanelReqItem: RequiredItemDetails = anyObject;
        let batteryReqItem: RequiredItemDetails = anyObject;
        if (solarPanelDetails != null) {
            solarPanelReqItem = {
                Id: solarPanelDetails.Id,
                Icon: solarPanelDetails.Icon,
                Colour: solarPanelDetails.Colour,
                Name: solarPanelDetails.Name,
                Quantity: minSolarPanels,
            };
        }
        if (batteryDetails != null) {
            batteryReqItem = {
                Id: batteryDetails.Id,
                Icon: batteryDetails.Icon,
                Colour: batteryDetails.Colour,
                Name: batteryDetails.Name,
                Quantity: minBatteries,
            };
        }

        const spSunrise = getSolarPowerSunrise(minSolarPanels);
        const spDay = getSolarPowerDay(minSolarPanels);
        const spSunset = getSolarPowerSunsest(minSolarPanels);
        const spNight = getSolarPowerNight(minSolarPanels);
        const spTotal = (spSunrise + spDay + spSunset + spNight);

        const totalPowerGenerated = spTotal - (localRequiredKP * 1000);
        const maxPowerThatCanBeStored = getMaxPowerThatCanBeStored(minBatteries);
        const totalPowerRequired = localRequiredKP * 800;
        let totalPowerStored = totalPowerGenerated;
        let totalPowerUnused = totalPowerStored - totalPowerRequired;
        let totalPowerLost = totalPowerGenerated - maxPowerThatCanBeStored;
        if (totalPowerLost < 0) totalPowerLost = 0;

        let showRecommended = false;
        if (totalPowerGenerated > maxPowerThatCanBeStored) {
            showRecommended = true;
            totalPowerStored = maxPowerThatCanBeStored;
            totalPowerUnused = totalPowerStored - totalPowerRequired;
        }

        return (
            <>
                <div className={classNames('section row', { 'not-recommended': showRecommended })}>
                    {minimumPanelsAndBatteries(solarPanelReqItem, batteryReqItem)}
                </div>

                {
                    (showRecommended) && (
                        <div className="section row">
                            <div className="col-12 mt-2em">
                                <h4 className="solar-calc-warning">{translate(LocaleKey.solarPanelsProduceMoreThanBatteries)
                                    .replaceAll('{0}', minSolarPanels.toString())
                                    .replaceAll('{1}', minBatteries.toString())}</h4>
                            </div>
                            {recommendedPanelsAndBatteries(solarPanelReqItem, batteryReqItem, minSolarPanels, minBatteries, totalPowerLost)}
                        </div>
                    )
                }

                <br />
                <hr />
                <br />

                <div className="section row">
                    <h3 className="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-xs-12 heading mt-1em">
                        {translate(LocaleKey.details)}
                    </h3>
                </div>
                <div className="section row justify mt-1em">
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        {totalPowerConsumedTable(localRequiredKP, props.selectedLanguage)}
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        {totalSolarProducedTable(props.selectedLanguage, minSolarPanels, spSunrise, spDay, spSunset, spNight, spTotal,)}
                    </div>
                </div>
                <div className="section row justify mt-1em">
                    <div className={classNames('col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12', { 'not-recommended': showRecommended })}>
                        {minimumSummaryTable(props.selectedLanguage, totalPowerStored, totalPowerRequired, totalPowerUnused, totalPowerLost)}
                    </div>
                    {
                        (showRecommended) && (
                            <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                {recommendedSummaryTable(props.selectedLanguage, totalPowerStored, totalPowerRequired, totalPowerUnused, totalPowerLost)}
                            </div>
                        )
                    }
                </div>

                <br />
                <hr />
                <br />

                <div className="section row justify">
                    <h3 className="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-xs-12 heading mt-1em">
                        {translate(LocaleKey.info)}
                    </h3>

                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-xs-12 ta-center mt-1em">
                        <p>{translate(LocaleKey.basedOnWorstCase)}</p>
                    </div>
                </div>

                <div className="section row justify mt-1em">
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <InGameInfoTable />
                    </div>
                    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                        <RealTimeInfoTable />
                    </div>
                </div>

                <div className="section row justify">
                    <div className="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-xs-12 ta-center mt-1em">
                        <p>{translate(LocaleKey.bestCaseScenarioLocation)}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12" style={{ marginTop: '8em' }}></div>
                </div>
            </>
        );
    }

    const handleLoadingOrError = (localRequiredKP: number = 0) => {
        if (networkState === NetworkState.Loading) return <div className="pt-5"><SmallLoading /></div>;
        if (networkState === NetworkState.Error) {
            return (<h2>{translate(LocaleKey.error)}</h2>);
        }
        return renderMinimumRequirements(localRequiredKP);
    }

    const title = translate(LocaleKey.solarPanelBatteryCalculator);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content solar-calc-page">
                <div className="row full justify pt1">
                    <GenericListPresenter
                        list={[
                            {
                                link: ExternalUrls.devilinPixyFiddle,
                                icon: 'contributors/devilinPixy.png',
                                name: 'DevilinPixy',
                                subtitle: translate(LocaleKey.viewOriginalWorkOnJsFiddle),
                            },
                        ]}
                        bootstrapClasses="col-12"
                        presenter={(data: any) => (
                            <BasicLink key={data.link} href={data.link} additionalClassNames="gen-item-container">
                                <ImageContainer Icon={data.icon} Name={data.name} />
                                <div className="gen-item-content-container">
                                    <TextContainer text={data.name} />
                                    <div className="quantity-container">
                                        {data.subtitle}
                                    </div>
                                    <ActionContainer
                                        actions={[
                                            <i key="open in new tab" className="material-icons mr-3">open_in_new</i>,
                                        ]}
                                    />

                                </div>
                            </BasicLink>
                        )}
                        isCentered={true}
                    />
                    <div className="col-12 mt-2em">
                        <h3>{translate(LocaleKey.totalPowerConsumption)}</h3>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-6">
                        <form id="searchBar" className="searchbar row noselect">
                            <input
                                type="number"
                                className="form-control ta-center"
                                placeholder="..."
                                value={requiredKP ?? ''}
                                onChange={onSearchTextChange}
                            />
                        </form>
                    </div>
                    <div className="col-3"></div>
                </div>
                {handleLoadingOrError(requiredKP)}
            </div>
        </DefaultAnimation>
    );
};

export const mapStateToProps = (state: State): IReduxProps => {
    return {
        selectedLanguage: state.settingReducer.selectedLanguage,
    };
};

export const SolarPanelPage = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps)(SolarPanelPageConnected),
    (services: IDependencyInjection) => ({
        gameItemService: services.gameItemService,
    })
);

