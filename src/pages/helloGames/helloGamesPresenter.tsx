import i18next from 'i18next';
import React from 'react';
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
                <ImageContainer Icon={image} Name={i18next.t(name)} Colour="" />
                <TextContainer text={i18next.t(name)} additionalCss="title" />
            </Link>
        );
    }

    const title = i18next.t(LocaleKey.helloGames);
    return (
        <>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row justify">
                        <div className="col-12 col-lg-3 col-md-4 col-sm-4">
                            {tilePresenter(routes.communityMission, LocaleKey.news, '')}
                        </div>
                        <div className="col-12 col-lg-3 col-md-4 col-sm-4">
                            <p>{i18next.t(LocaleKey.releaseNotes)}</p>
                        </div>
                        <div className="col-12 col-lg-3 col-md-4 col-sm-4">
                            <p>{i18next.t(LocaleKey.communityMission)}</p>
                        </div>
                        <div className="col-12 col-lg-3 col-md-4 col-sm-4">
                            <p>{i18next.t(LocaleKey.nmsWebsite)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
