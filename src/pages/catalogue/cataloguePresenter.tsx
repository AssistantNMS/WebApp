import i18next from 'i18next';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { SpotlightSearch } from '../../components/common/spotlight/spotlightSearch';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameIdSearchFloatingActionButton } from '../../components/floatingActionButton/gameIdSearchFloatingActionButton';
import { DrawerMenuItem } from '../../contracts/DrawerMenuItem';
import { DrawerIconType } from '../../contracts/enum/DrawerIconType';
import { getCatalogueMenuItems } from '../../helper/catalogueMenuItemsHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IWithDepInj {
    dataJsonService: DataJsonService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj { }

export const CataloguePresenterUnconnected: React.FC<IProps> = (props: IProps) => {
    const [isSpotlightOpen, setSpotlightOpen] = useState<boolean>(false);

    const getNavActionButtons = (): Array<any> => {
        const components: any[] = [];
        components.push(<GameIdSearchFloatingActionButton key="gameIdSearch" onClick={() => setSpotlightOpen(true)} />);
        return components;
    }

    const menuItems = getCatalogueMenuItems();

    const renderIcon = (item: DrawerMenuItem) => {
        if (item.iconType === DrawerIconType.Material) return (<i className="material-icons">{item.icon}</i>);
        if (item.iconType === DrawerIconType.Custom) return (<img className="custom-icons" src={item.icon} alt={item.icon} />);

        return null;
    }

    const title = i18next.t(LocaleKey.catalogue);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} additionalItems={getNavActionButtons()} />
            <div className="content" data-id="CataloguePresenter">
                <div className="container full pt1">
                    <div className="catalogue-container">
                        {
                            menuItems.map((item) => {
                                return (
                                    <div className="catalogue-item noselect" key={item.name}>
                                        <Link to={item.link} className="nav-link">
                                            {
                                                renderIcon(item)
                                            }
                                            <p>{item.name}</p>
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <SpotlightSearch
                isOpen={isSpotlightOpen}
                onClose={() => setSpotlightOpen(false)}
                dataJsonService={props.dataJsonService}
            />
        </DefaultAnimation>
    );
}

export const CataloguePresenter = withServices<IWithoutDepInj, IWithDepInj>(
    CataloguePresenterUnconnected,
    (services: IDependencyInjection) => ({
        dataJsonService: services.dataJsonService,
    })
);