import React, { useState } from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { SpotlightSearch } from '../../components/common/spotlight/spotlightSearch';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { GameIdSearchFloatingActionButton } from '../../components/floatingActionButton/gameIdSearchFloatingActionButton';
import { MenuGridItemPresenter } from '../../components/tilePresenter/menuGridPresenter';
import { getCatalogueMenuItems } from '../../helper/catalogueMenuItemsHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { DataJsonService } from '../../services/json/DataJsonService';

interface IWithDepInj {
  dataJsonService: DataJsonService;
}
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

export const CataloguePresenterUnconnected: React.FC<IProps> = (props: IProps) => {
  const [isSpotlightOpen, setSpotlightOpen] = useState<boolean>(false);

  const getNavActionButtons = (): Array<JSX.Element> => {
    const components: Array<JSX.Element> = [];
    components.push(<GameIdSearchFloatingActionButton key="gameIdSearch" onClick={() => setSpotlightOpen(true)} />);
    return components;
  };

  const menuItems = getCatalogueMenuItems();

  const title = translate(LocaleKey.catalogue);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} additionalItems={getNavActionButtons()} />
      <div className="content" data-id="CataloguePresenter">
        <div className="container full pt1">
          <div className="catalogue-container">
            {menuItems.map((item) => (
              <MenuGridItemPresenter key={item.name} {...item} />
            ))}
          </div>
        </div>
      </div>
      <SpotlightSearch isOpen={isSpotlightOpen} onClose={() => setSpotlightOpen(false)} dataJsonService={props.dataJsonService} />
    </DefaultAnimation>
  );
};

export const CataloguePresenter = withServices<IWithoutDepInj, IWithDepInj>(CataloguePresenterUnconnected, (services: IDependencyInjection) => ({
  dataJsonService: services.dataJsonService,
}));
