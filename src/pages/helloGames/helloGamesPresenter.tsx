import React from 'react';
import { translate } from '../../localization/Translate';
import { Link } from 'react-router-dom';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { TextContainer } from '../../components/common/tile/textContainer';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import * as routes from '../../constants/Route';
import { LocaleKey } from '../../localization/LocaleKey';

export const HelloGamesPresenter: React.FC = () => {
  const tilePresenter = (link: string, name: LocaleKey, image: string) => {
    return (
      <Link to={link} className="guide item card">
        <ImageContainer Icon={image} Name={translate(name)} Colour="" />
        <TextContainer text={translate(name)} additionalCss="title" />
      </Link>
    );
  };

  const title = translate(LocaleKey.helloGames);
  return (
    <>
      <HeadComponent title={title} />
      <NavBar title={title} />
      <div className="content">
        <div className="container full pt1">
          <div className="row justify">
            <div className="col-12 col-lg-3 col-md-4 col-sm-4">{tilePresenter(routes.communityMission, LocaleKey.news, '')}</div>
            <div className="col-12 col-lg-3 col-md-4 col-sm-4">
              <p>{translate(LocaleKey.releaseNotes)}</p>
            </div>
            <div className="col-12 col-lg-3 col-md-4 col-sm-4">
              <p>{translate(LocaleKey.communityMission)}</p>
            </div>
            <div className="col-12 col-lg-3 col-md-4 col-sm-4">
              <p>{translate(LocaleKey.nmsWebsite)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
