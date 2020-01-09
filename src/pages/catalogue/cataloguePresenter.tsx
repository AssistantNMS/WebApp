import React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { getCatalogueMenuItems } from '../../helper/CatalogueMenuItemsHelper';
import { DrawerIconType } from '../../contracts/enum/DrawerIconType';
import { DrawerMenuItem } from '../../contracts/DrawerMenuItem';

import './catalogue.scss';

export const CataloguePresenter: React.FC = () => {
    const menuItems = getCatalogueMenuItems();

    const renderIcon = (item: DrawerMenuItem) => {
        if (item.iconType === DrawerIconType.Material) return (<i className="material-icons">{item.icon}</i>);
        if (item.iconType === DrawerIconType.Custom) return (<img className="custom-icons" src={item.icon} alt={item.icon} />);

        return null;
    }

    return (
        <>
            <NavBar title={i18next.t(LocaleKey.catalogue)} />
            <div className="content">
                <div className="container" style={{ paddingTop: '1em', maxWidth: 'unset' }}>
                    <div className="catalogue-container">
                        {
                            menuItems.map((item) => {
                                return (
                                    <div className="catalogue-item" key={item.name}>
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
        </>
    );
}