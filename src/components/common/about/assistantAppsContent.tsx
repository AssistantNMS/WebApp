import React, { ReactNode, useEffect, useState } from 'react';
import { AssistantAppLinkItem, AssistantAppLinks } from '../../../contracts/data/assistantAppLinks';
import { IDependencyInjection, withServices } from '../../../integration/dependencyInjection';
import { DataJsonService } from '../../../services/json/DataJsonService';
import { ImageContainer } from '../tile/imageContainer';
import { TextContainer } from '../tile/textContainer';

interface IWithDepInj {
  dataJsonService: DataJsonService;
}

interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const AssistantAppsContentUnconnected: React.FC<IProps> = (props: IProps) => {
  const [appLinks, setAppLinks] = useState<Array<AssistantAppLinks>>([]);

  useEffect(() => {
    loadMetaJson();
  }, []);

  const loadMetaJson = async () => {
    const appLinksJson = await props.dataJsonService.getAssistantAppLinks();
    if (appLinksJson.isSuccess) setAppLinks(appLinksJson.value);
  };

  return (
    <>
      <div className="generic-item-list row mb-2em">
        <div className="col-12">
          <img src="/assets/images/assistantApps.png" alt="AssistantApps" style={{ maxWidth: '100px' }} />
          <br />
          <h3>AssistantApps</h3>
          <p>This app is part of the AssistantApps range</p>
        </div>
        <div className="col-12 mb-2em">
          {(appLinks ?? []).map((appl: AssistantAppLinks) => {
            return <ListTile key={appl.guid} item={appl} />;
          })}
        </div>
      </div>
    </>
  );
};

export const AssistantAppsContent = withServices<IWithoutDepInj, IWithDepInj>(AssistantAppsContentUnconnected, (services: IDependencyInjection) => ({
  dataJsonService: services.dataJsonService,
}));

interface IAssistantAppLinkListTileProps {
  item: AssistantAppLinks;
}

const ListTile: React.FC<IAssistantAppLinkListTileProps> = (props: IAssistantAppLinkListTileProps) => (
  <div key={props.item.guid} className="row justify">
    <div className="gen-item col-12 col-xl-5 col-lg-8 col-md-10 col-sm-10 col-xs-12">
      <div className="gen-item-container" draggable={false}>
        <ImageContainer Icon={props.item.logoUrl} Name={props.item.name} IsExternal={true} />
        <div className="gen-item-content-container">
          <TextContainer text={props.item.name} />
          <div className="quantity-container">
            {(props?.item?.links ?? []).map((l: AssistantAppLinkItem, index: number) => {
              const children: Array<ReactNode> = [];
              if (index > 0) children.push(<span key={l.type + 'seperator' + index}>,&nbsp;&nbsp;&nbsp;</span>);
              children.push(
                <a key={l.type + index} href={l.url} className="uppercase secondary-colour" target="_blank" rel="noopener noreferrer">
                  <b>{l.type}</b>&nbsp;
                  <i className="material-icons small">open_in_new</i>
                </a>,
              );

              return <span key={`${l.url}-${index}`}>{children}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
);
