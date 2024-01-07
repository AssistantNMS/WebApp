import React from 'react';
import { connect } from 'react-redux';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { BasicLink } from '../../components/core/link';
import { NavBar } from '../../components/core/navbar/navbar';
import { MenuGridItemPresenter } from '../../components/tilePresenter/menuGridPresenter';
import { allItemsMenuItem, catalogueMenuItem, communityMissionMenuItem, expeditionMenuItem, favouritesMenuItem, nmsfmMenuItem, patreonMenuItem, whatIsNewMenuItem } from '../../constants/MenuItems';
import { DrawerMenuItem } from '../../contracts/DrawerMenuItem';
import { getCurrentLanguage } from '../../redux/modules/setting/selector';
import { State } from '../../redux/state';

interface IFromRedux {
    selectedLanguage: string
}

interface IProps extends IFromRedux { }

interface IState { }

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
        store: 'google',
        link: 'https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes',
    },
    {
        store: 'apple',
        link: 'https://apps.apple.com/us/app/id1480287625?platform=iphone',
    },
    {
        store: 'microsoft',
        link: 'https://apps.microsoft.com/store/detail/assistant-for-no-mans-sky/9NQLF7XD0LF3',
    },
];

export class HomeContainerUnconnected extends React.Component<IProps, IState> {

    renderStoreButton = (storeItem: any) => {
        return (
            <BasicLink additionalClassNames="image store mb-2em" key={storeItem.link} href={storeItem.link} title={storeItem.store}>
                <assistant-apps-store-tile
                    language={this.props.selectedLanguage}
                    store={storeItem.store}
                    alt="store badge"
                />
            </BasicLink>
        );
    }

    render() {
        return (
            <DefaultAnimation>
                <HeadComponent title="Home" />
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
                        {storeItems.map(this.renderStoreButton)}
                    </div>
                </div>
            </DefaultAnimation>
        );
    }
}

export const HomeContainer = connect((state: State) => ({
    selectedLanguage: getCurrentLanguage(state),
}))(HomeContainerUnconnected);