import React from "react";

import { GenericListPresenter } from "../../components/common/genericListPresenter/genericListPresenter";
import { RequiredItemDetailsListTile } from "../../components/tilePresenter/requiredItemListTile/requiredItemDetailsListTile";
import { RequiredItemDetails } from "../../contracts/RequiredItemDetails";
import { localizeNumber, roundDecimalNum } from "../../helper/mathHelper";
import { LocaleKey } from "../../localization/LocaleKey";
import { translate } from "../../localization/Translate";
import { getRecommendedAmountOfBatteries } from "./solarPanelCalcs";

const headingText = (locale: LocaleKey) =>
    (<span className="table-heading">{translate(locale)}</span>);

const rowText = (text: string) =>
    (<p className="table-text">{text}</p>);

const rowNumeric = (value: number, langCode: string) =>
    rowText(localizeNumber(roundDecimalNum(value, 0), langCode));

const correctlySizedImageFromIcon = (icon: string) => (
    <div className="table-icon">
        <i key={icon} className="material-icons">{icon}</i>
    </div>
);

interface IPowerTableProps {
    langCode: string;
    totalPowerCons: number;
    sunrise: number;
    day: number;
    sunset: number;
    night: number;
    total: number;
}
export const PowerTable: React.FC<IPowerTableProps> = (props: IPowerTableProps) => {
    return (
        <div className="solar-calc card mt-0">
            <table>
                <tbody>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_6')}</td>
                        <td className="text left">{headingText(LocaleKey.sunrise)}</td>
                        <td className="text right">{rowNumeric(props.sunrise, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_7')}</td>
                        <td className="text left">{headingText(LocaleKey.daytime)}</td>
                        <td className="text right">{rowNumeric(props.day, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_4')}</td>
                        <td className="text left">{headingText(LocaleKey.sunset)}</td>
                        <td className="text right">{rowNumeric(props.sunset, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_3')}</td>
                        <td className="text left">{headingText(LocaleKey.night)}</td>
                        <td className="text right">{rowNumeric(props.night, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon"></td>
                        <td className="text"></td>
                        <td className="text"><hr /></td>
                    </tr>
                    <tr>
                        <td className="icon"></td>
                        <td className="text"></td>
                        <td className="text right">{rowNumeric(props.total, props.langCode)}</td>
                    </tr>
                    <tr></tr>
                </tbody>
            </table>
        </div>
    );
}

interface ISummaryTableProps {
    langCode: string;
    powerStoredForNight: number;
    powerRequiredForNight: number;
    powerUnused: number;
    powerLost: number;
}
export const SummaryTable: React.FC<ISummaryTableProps> = (props: ISummaryTableProps) => {
    return (
        <div className="solar-calc card mt-0">
            <table>
                <tbody>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('battery_charging_full')}</td>
                        <td className="text left">{headingText(LocaleKey.powerStored)}</td>
                        <td className="text right">{rowNumeric(props.powerStoredForNight, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('lightbulb_outline')}</td>
                        <td className="text left">{headingText(LocaleKey.powerRequired)}</td>
                        <td className="text right">{rowNumeric(props.powerRequiredForNight, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('battery_alert')}</td>
                        <td className="text left">{headingText(LocaleKey.powerUnused)}</td>
                        <td className="text right">{rowNumeric(props.powerUnused, props.langCode)}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('delete_outline')}</td>
                        <td className="text left">{headingText(LocaleKey.powerLost)}</td>
                        <td className="text right">{rowNumeric(props.powerLost, props.langCode)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export const InGameInfoTable: React.FC<any> = () => {
    return (
        <div className="solar-calc card mt-0">
            <table>
                <tbody>
                    <tr>
                        <td className="icon"></td>
                        <td className="text"></td>
                        <td className="text">{headingText(LocaleKey.inGame)}</td>
                        <td className="text"></td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_6')}</td>
                        <td className="text left">{headingText(LocaleKey.sunrise)}</td>
                        <td className="text">{rowText('05:20 - 06:26')}</td>
                        <td className="text right">{rowText('1h 06m')}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_7')}</td>
                        <td className="text left">{headingText(LocaleKey.daytime)}</td>
                        <td className="text">{rowText('06:26 - 17:34')}</td>
                        <td className="text right">{rowText('11h 08m')}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_4')}</td>
                        <td className="text left">{headingText(LocaleKey.sunset)}</td>
                        <td className="text">{rowText('17:34 - 18:40')}</td>
                        <td className="text right">{rowText('1h 06m')}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_3')}</td>
                        <td className="text left">{headingText(LocaleKey.night)}</td>
                        <td className="text">{rowText('18:40 - 05:20')}</td>
                        <td className="text right">{rowText('10h 40m')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
export const RealTimeInfoTable: React.FC<any> = () => {
    return (
        <div className="solar-calc card mt-0">
            <table>
                <tbody>
                    <tr>
                        <td className="icon"></td>
                        <td className="text"></td>
                        <td className="text">{headingText(LocaleKey.realTime)}</td>
                        <td className="text"></td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_6')}</td>
                        <td className="text left">{headingText(LocaleKey.sunrise)}</td>
                        <td className="text">{rowText('25kPs')}</td>
                        <td className="text right">{rowText('82.5s')}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_7')}</td>
                        <td className="text left">{headingText(LocaleKey.daytime)}</td>
                        <td className="text">{rowText('50kPs')}</td>
                        <td className="text right">{rowText('835s')}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_4')}</td>
                        <td className="text left">{headingText(LocaleKey.sunset)}</td>
                        <td className="text">{rowText('25kPs')}</td>
                        <td className="text right">{rowText('82.5s')}</td>
                    </tr>
                    <tr>
                        <td className="icon">{correctlySizedImageFromIcon('brightness_3')}</td>
                        <td className="text left">{headingText(LocaleKey.night)}</td>
                        <td className="text">{rowText('0kPs')}</td>
                        <td className="text right">{rowText('800s')}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export const minimumPanelsAndBatteries = (
    solarPanelReqItem: RequiredItemDetails,
    batteryReqItem: RequiredItemDetails,
) => {
    return (
        <>
            <div className="col-12">
                <h3>{translate(LocaleKey.minimum)}</h3>
            </div>
            <div className="col-12">
                <GenericListPresenter
                    list={[solarPanelReqItem, batteryReqItem]}
                    presenter={RequiredItemDetailsListTile}
                    isCentered={true}
                    limitResultsTo={3}
                />
            </div>
        </>
    )
}

export const recommendedPanelsAndBatteries = (
    solarPanelReqItem: RequiredItemDetails,
    batteryReqItem: RequiredItemDetails,
    minSolarPanels: number,
    minBatteries: number,
    totalPowerLost: number,
) => {
    const resArray: Array<RequiredItemDetails> = [
        {
            ...solarPanelReqItem,
            Quantity: minSolarPanels,
        },
        {
            ...batteryReqItem,
            Quantity: getRecommendedAmountOfBatteries(
                minBatteries,
                totalPowerLost,
            )
        }
    ];
    return (
        <>
            <div className="col-12">
                <h3>{translate(LocaleKey.recommended)}</h3>
            </div>
            <div className="col-12">
                <GenericListPresenter
                    list={resArray}
                    presenter={RequiredItemDetailsListTile}
                    isCentered={true}
                    limitResultsTo={3}
                />
            </div>
        </>
    )
}