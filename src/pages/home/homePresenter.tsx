import React from 'react';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';


export const HomePresenter: React.FC = () => {
    return (
        <>
            <HeadComponent title={"Home"} />
            <NavBar title="Home" />
            <div className="content">
                <div className="container full pt1">
                    <div className="row" style={{ display: 'block' }}>
                        <h1>Welcome!</h1>
                        <h3>This is the Web version of the <b>Assistant for No Man's Sky</b> Apps.
                    <br />A lot of features that are available in the Android and iOS Apps will be added</h3>
                    </div>
                    <div className="row">
                        <a target="_blank" rel="noopener noreferrer" className="col-12-xsmall col-12 col-lg-6 col-md-6 col-sm-12 image store mt-3em" href="https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes&amp;ref=AssistantNMS" title="Download on the Play Store">
                            <img draggable="false" style={{ maxWidth: '100%' }} src="https://nmsassistant.com/assets/img/PlayStore.png" alt="google play store badge" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" className="col-12-xsmall col-12 col-lg-6 col-md-6 col-sm-12 image store mt-3em" href="https://apps.apple.com/us/app/id1480287625?ref=AssistantNMS" title="Download on the App Store">
                            <img draggable="false" style={{ maxWidth: '100%' }} src="https://nmsassistant.com/assets/img/AppStore.png" alt="apple app store badge" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}