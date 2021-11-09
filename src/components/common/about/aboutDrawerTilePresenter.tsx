import i18next from 'i18next';
import React, { useEffect, useState } from "react";
import { MetaData } from '../../../contracts/data/metaData';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { LocaleKey } from '../../../localization/LocaleKey';
import { DataJsonService } from '../../../services/json/DataJsonService';
import { CustomTooltip } from '../tooltip/tooltip';

interface IWithDepInj {
    dataJsonService: DataJsonService;
}

interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj {
}

export const AboutDrawerTilePresenterUnconnected: React.FC<IProps> = (props: IProps) => {
    const [metaJson, setMetaJson] = useState<MetaData>();

    useEffect(() => {
        loadMetaJson();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadMetaJson = async () => {
        const metaJson = await props.dataJsonService.getMeta();
        if (metaJson.isSuccess) setMetaJson(metaJson.value);
    }

    const versionString = i18next.t(LocaleKey.appVersion).replace('{0}', process.env.REACT_APP_VERSION ?? '');
    const gameVersionString = i18next.t(LocaleKey.gameVersion).replace('{0}', (metaJson?.GameVersion ?? ''));
    const gameVersionGeneratedDate = (metaJson?.GeneratedDate ?? '') + ' '; // dont know why this is needed

    return (
        <>
            <span style={{ textAlign: 'center', padding: '.5em .5em 0 .5em' }}
                data-version={require('../../../buildName.json')}>
                {versionString}
            </span>
            <CustomTooltip tooltipText={gameVersionGeneratedDate} position="top-start" theme="light">
                <div style={{ textAlign: 'center' }}>
                    {gameVersionString}
                </div>
            </CustomTooltip>
        </>
    );
}

export const AboutDrawerTilePresenter = withServices<IWithoutDepInj, IWithDepInj>(
    AboutDrawerTilePresenterUnconnected,
    (services: IDependencyInjection) => ({
        dataJsonService: services.dataJsonService,
    })
);