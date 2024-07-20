import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { translate } from '../../localization/Translate';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { AddFloatingActionButton } from '../../components/floatingActionButton/addFloatingActionButton';
import { PortalCardListTile } from '../../components/tilePresenter/portalItemListTile/portalItemListTile';
import * as Route from '../../constants/Route';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './portal.Redux';

interface IProps {
  portals: Array<PortalRecord>;
  useAltGlyphs: boolean;
  removePortal: (portalId: string) => void;
}

export const PortalListPresenterUnconnected: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();

  const displayPortals = (portals: Array<PortalRecord>) => {
    if (portals == null || portals.length === 0)
      return (
        <div className="col-12">
          <h2>{translate(LocaleKey.noItems)}</h2>
        </div>
      );
    return portals.map((item: PortalRecord, index: number) => {
      return (
        <div key={`portal-${item.Uuid}-${index}`} className="col-12 col-xl-4 col-lg-6 col-md-6 col-sm-6">
          <PortalCardListTile
            {...item}
            useAltGlyphs={props.useAltGlyphs}
            onDelete={() => props.removePortal(item.Uuid)}
            onEdit={() =>
              navigate(Route.addEditPortal, {
                state: { item },
              })
            }
          />
        </div>
      );
    });
  };

  const title = translate(LocaleKey.portalLibrary);
  return (
    <DefaultAnimation>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="row full pt1">{displayPortals(props.portals)}</div>
      </div>
      {AddFloatingActionButton('portal-add', () => navigate(Route.addEditPortal))}
      <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
    </DefaultAnimation>
  );
};

export const PortalListPresenter = connect(mapStateToProps, mapDispatchToProps)(PortalListPresenterUnconnected);
