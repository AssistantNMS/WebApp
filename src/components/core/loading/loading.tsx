import { translate } from '../../../localization/Translate';
import * as React from 'react';
import { TextContainer } from '../../common/tile/textContainer';
import { LocaleKey } from '../../../localization/LocaleKey';
import { LazyLoadImage } from '../lazyLoadImage/lazyLoadImage';
import { AppImage } from '../../../constants/AppImage';


export const Loading: React.FC = () => {
    return (
        <>
            <div className="full-page-loader opacity80"></div>
            <div className="full-page-loader">
                <div className="cssload-container">
                    <ul className="cssload-flex-container">
                        <li style={{ listStyleType: 'none' }}>
                            <img
                                src={`${AppImage.base()}loader.svg`}
                                draggable="false"
                                alt="loading-animation"
                            />
                            <h2 className="largeHeading">Loading...</h2>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

interface ISmallLoadingProps {
    maxWidth?: string
    hideText?: boolean
}
export const SmallLoading: React.FC<ISmallLoadingProps> = (props: ISmallLoadingProps) => {
    return (
        <div className="container" data-id="SmallLoading">
            <div className="row">
                <div className="col-12" style={{ textAlign: 'center' }}>
                    <img
                        src={`${AppImage.base()}loader.svg`}
                        draggable="false"
                        alt="loading-animation"
                        style={{ maxWidth: props?.maxWidth ?? '100px' }}
                    />
                    {
                        (props.hideText !== true) &&
                        <h2 className="largeHeading">Loading...</h2>
                    }
                </div>
            </div>
        </div>
    );
}

export const TileLoading = () => {
    return (
        <div className="gen-item-container">
            <div className="image-container" style={{ paddingRight: '1em' }}>
                <LazyLoadImage src={`${AppImage.base()}loader.svg`} alt="loading" draggable={false} style={{
                    width: '100px', maxHeight: '100px',
                    padding: '0.25em 1em'
                }} />
            </div>
            <div className="gen-item-content-container">
                <TextContainer text={translate(LocaleKey.loading)} additionalCss="full" />
            </div>
        </div>
    );
}
