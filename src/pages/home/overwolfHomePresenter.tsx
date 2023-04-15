import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { BasicLink } from '../../components/core/link';
import { NavBar } from '../../components/core/navbar/navbar';
import { MenuGridItemPresenter } from '../../components/tilePresenter/menuGridPresenter';
import { AppImage } from '../../constants/AppImage';
import { allItemsMenuItem, catalogueMenuItem, communityMissionMenuItem, expeditionMenuItem, favouritesMenuItem, nmsfmMenuItem, patreonMenuItem, whatIsNewMenuItem } from '../../constants/MenuItems';
import { DrawerMenuItem } from '../../contracts/DrawerMenuItem';

export const OverwolfHomePresenter: React.FC = () => {
    const menuItems: Array<DrawerMenuItem> = [
        allItemsMenuItem(),
        whatIsNewMenuItem(),
        patreonMenuItem(),
        communityMissionMenuItem(),
        catalogueMenuItem(),
        favouritesMenuItem(),
        nmsfmMenuItem(),
        expeditionMenuItem(),
    ];

    return (
        <DefaultAnimation>
            <HeadComponent title={"Home"} />
            <NavBar title="Home" />
            <div className="container full" data-id="HomePresenter">
                <div className="row" style={{ display: 'block' }}>
                    <h3 style={{ fontStyle: 'italic' }}>This is the Web version of the <b>Assistant for No Man's Sky</b> Apps.</h3>
                </div>
            </div>
            <div className="content mb-2em">
                <div className="container full pt1">
                    <div className="catalogue-container">
                        {
                            menuItems.map((item) => (
                                <MenuGridItemPresenter key={item.name} {...item} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="col-12" style={{ marginTop: '8em' }}></div>
        </DefaultAnimation>
    );
}