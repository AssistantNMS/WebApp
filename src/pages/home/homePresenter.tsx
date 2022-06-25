import React from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { BasicLink } from '../../components/core/link';
import { NavBar } from '../../components/core/navbar/navbar';
import { MenuGridItemPresenter } from '../../components/tilePresenter/menuGridPresenter';
import { allItemsMenuItem, catalogueMenuItem, communityMissionMenuItem, expeditionMenuItem, favouritesMenuItem, nmsfmMenuItem, patreonMenuItem, whatIsNewMenuItem } from '../../constants/MenuItems';
import { DrawerMenuItem } from '../../contracts/DrawerMenuItem';

export const HomePresenter: React.FC = () => {
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

    const storeItems = [
        {
            name: 'Download on the Play Store',
            link: 'https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes',
            img: '/assets/images/store/PlayStore.png',
        },
        {
            name: 'Download on the Apple App Store',
            link: 'https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes',
            img: '/assets/images/store/AppStore.png',
        },
        {
            name: 'Download on the Windows Store',
            link: 'https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes',
            img: '/assets/images/store/WindowsStore.png',
        }
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
            <br />
            <div className="container full mt-3em">
                <div className="row justify">
                    {
                        storeItems.map(storeItem => (
                            <BasicLink additionalClassNames="image store mb-2em" href={storeItem.link} title={storeItem.name}>
                                <img draggable="false" style={{ maxHeight: '6em' }} src={storeItem.img} alt={storeItem.name} />
                            </BasicLink>
                        ))
                    }
                </div>
            </div>
        </DefaultAnimation>
    );
}