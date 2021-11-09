import React from 'react';
import { HeadComponent } from '../../components/core/headComponent';
import { LazyLoadImage } from '../../components/core/lazyLoadImage/lazyLoadImage';
import { NavBar } from '../../components/core/navbar/navbar';


export const HomePresenter: React.FC = () => {
    return (
        <>
            <HeadComponent title={"Home"} />
            <NavBar title="Home" />
            <div className="content">
                <div className="container full">
                    <div className="row" style={{ display: 'block' }}>
                        <h3 style={{ fontStyle: 'italic' }}>This is the Web version of the <b>Assistant for No Man's Sky</b> Apps.</h3>
                    </div>
                    <div className="row justify">
                        <LazyLoadImage
                            src="assets/images/screenshots/appStore.png"
                            alt="appStoreScreenshot"
                            draggable={false}
                            style={{ maxWidth: '50vw', borderRadius: '10px' }}
                        />
                    </div>
                    <div className="row justify">
                        <a target="_blank" rel="noopener noreferrer" className="image store mb-2em" style={{ textAlign: 'right' }} href="https://play.google.com/store/apps/details?id=com.kurtlourens.no_mans_sky_recipes&amp;ref=AssistantNMS" title="Download on the Play Store">
                            <img draggable="false" style={{ maxWidth: '80%' }} src="https://nmsassistant.com/assets/img/PlayStore.png" alt="google play store badge" />
                        </a>
                        <a target="_blank" rel="noopener noreferrer" className="image store mb-2em" style={{ textAlign: 'left' }} href="https://apps.apple.com/us/app/id1480287625?ref=AssistantNMS" title="Download on the App Store">
                            <img draggable="false" style={{ maxWidth: '80%' }} src="https://nmsassistant.com/assets/img/AppStore.png" alt="apple app store badge" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}