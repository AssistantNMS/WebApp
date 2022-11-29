import React, { createRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { GenericListPresenter } from '../../components/common/genericListPresenter/genericListPresenter';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { TextContainer } from '../../components/common/tile/textContainer';
import { HeadComponent } from '../../components/core/headComponent';
import { BasicLink } from '../../components/core/link';
import { NavBar } from '../../components/core/navbar/navbar';
import { BaseFloatingActionButton } from '../../components/floatingActionButton/baseFloatingActionButton';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { newGuid } from '../../helper/guidHelper';
import { getPortalImage, getPortalImageType } from '../../helper/portalHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { translate } from '../../localization/Translate';
import { ToastService } from '../../services/toastService';
import { IReduxProps, mapDispatchToProps, mapStateToProps } from './portal.Redux';

interface IWithDepInj {
    toastService: ToastService;
}
interface IWithoutDepInj { }
interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps { }

export const RandomPortalUnconnected: React.FC<IProps> = (props: IProps) => {
    const arr = Array.from(Array(12).keys());
    const [slotArr] = useState<Array<string>>(arr.map(() => newGuid()));
    const [slotRefs] = useState<Array<any>>(arr.map(() => createRef()));
    const [isSpinning, setIsSpinning] = useState<boolean>(true);
    const [currentPortalCode, setCurrentPortalCode] = useState<string>('');
    const portalList = Array.from(Array(16).keys()).map((_: any, index: number) => index.toString(16));
    const glyphType = getPortalImageType(props.useAltGlyphs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => getRandomAddressInternal(), []);

    const getRandomAddress = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        getRandomAddressInternal();
    }

    const getRandomAddressInternal = () => {
        const portalCode = [];
        for (const slotRef of slotRefs) {
            const options = slotRef.current.children;
            const randomOption = Math.floor(
                Math.random() * options.length
            );
            const choosenOption = options[randomOption];
            portalCode.push(choosenOption.getAttribute('data-id'));
            const top = choosenOption.offsetTop - 2;
            slotRef.current.style.top = `-${top}px`;
        }
        setCurrentPortalCode(portalCode.join(''));
        setTimeout(() => setIsSpinning(false), 2000);
    }

    const copyAddress = () => {
        navigator?.clipboard?.writeText?.(currentPortalCode)?.then?.(() => {
            props.toastService.success(<span>{translate(LocaleKey.portalCodeCopied)}</span>);
        });
    }

    const displaySlots = () => {
        return slotArr.map((uuid: string, index: number) => {
            let localList = [...portalList, ...portalList];
            if (index === 0) localList = [portalList[0]];
            if (index === 1) localList = ['0', '1', '2'];
            return (
                <div key={`slot-${uuid}-${index}`} className="portal-slot col-2 col-xl-2 col-lg-2 col-md-2 col-sm-3">
                    <div className="portal-slot-wheel noselect">
                        <div className="wheel-content">
                            <img
                                src="/assets/images/portals/dot.png"
                                alt="portal-spacer"
                                className="portal-slot-item-placeholder"
                            />
                            <div ref={slotRefs[index]} className="disc">
                                {
                                    localList.map((portalCode: string, index: number) => (
                                        <div
                                            key={`${portalCode}-${index}`}
                                            data-id={portalCode.toUpperCase()}
                                            className={`portal-slot-item item-${index}`}
                                        >
                                            <img src={getPortalImage(glyphType, (index % 16))} alt={portalCode} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    const title = translate(LocaleKey.portalLibrary);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="row full pt1 slots">
                    <GenericListPresenter
                        list={[
                            {
                                link: ExternalUrls.captainSteveYoutubeDiceRollPlaylist,
                                icon: 'contributors/captainSteve.png',
                                name: 'Captain Steve',
                                subtitle: 'Dice Exploration Playlist',
                            },
                            {
                                link: ExternalUrls.nmsPortals,
                                icon: 'contributors/portal.png',
                                name: 'No Man\'s Sky Portal Decoder',
                                subtitle: 'nmsportals.github.io',
                            }
                        ]}
                        bootstrapClasses="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12"
                        presenter={(data: any) => (
                            <BasicLink key={data.link} href={data.link} additionalClassNames="gen-item-container">
                                <ImageContainer Icon={data.icon} Name={data.name} />
                                <div className="gen-item-content-container">
                                    <TextContainer text={data.name} />
                                    <div className="quantity-container">
                                        {data.subtitle}
                                    </div>
                                </div>
                            </BasicLink>
                        )}
                        isCentered={true}
                    />
                </div>
                <div className="row full pt1 slots">
                    {displaySlots()}
                </div>
            </div>
            <div style={{ position: 'absolute', bottom: '1em', right: '1em' }}>
                <BaseFloatingActionButton
                    key="portal-copy"
                    keyString="portal-copy"
                    icon={<i className="material-icons">content_copy</i>}
                    isDisabled={isSpinning}
                    onClick={copyAddress}
                />
                <BaseFloatingActionButton
                    key="portal-refresh"
                    keyString="portal-refresh"
                    icon={<i className="material-icons">refresh</i>}
                    isDisabled={isSpinning}
                    onClick={getRandomAddress}
                />
            </div>
            <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
        </DefaultAnimation>
    );
};


export const RandomPortal = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(RandomPortalUnconnected),
    (services: IDependencyInjection) => ({
        toastService: services.toastService,
    })
);