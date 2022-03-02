import React from 'react';
import { ReactNode } from 'react-markdown/lib/react-markdown';
import { invertColor } from '../../helper/colourHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ToastService } from '../../services/toastService';
import { AdditionalInfoChip } from '../common/chip/additionalInfoChip';
import { LazyLoadImage } from './lazyLoadImage/lazyLoadImage';
import { DecriptionRegexHighlightText } from '../common/descriptionRegexHighlighter';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';

interface IWithDepInj {
    toastService: ToastService;
}
interface IWithoutDepInj {
    Colour?: string;
    Id?: string;
    Icon?: string;
    Name?: string;
    Group?: string;
    CdnUrl?: string;
    HasDevProperties?: boolean;
    Description?: string;
    Link?: any;
    controlLookup?: Array<PlatformControlMapping>;
    children?: ReactNode;
    openDevProperties?: () => void;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const ItemHeaderRowUnconnected: React.FC<IProps> = (props: IProps) => {
    const name = props?.Name ?? '...';
    const group = props?.Group ?? '...';

    return (
        <div className="row border-bottom pos-rel">
            <div className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container noselect"
                style={{ backgroundColor: `#${props.Colour}`, position: 'relative' }}>
                {
                    (props?.Icon != null)
                        ? <LazyLoadImage src={`/assets/images/${props?.Icon ?? ''}`} alt={name} style={{ maxWidth: '100%' }} />
                        : null
                }
                {
                    props.CdnUrl &&
                    <a href={props.CdnUrl} title="HD image" rel="noopener noreferrer" target="_blank">
                        <i className="material-icons" style={{ position: 'absolute', top: '.5em', right: '.5em', color: invertColor(props.Colour || '000000') }}>hd</i>
                    </a>
                }
                {
                    props.HasDevProperties &&
                    <i className="material-icons pointer"
                        onClick={props.openDevProperties}
                        style={{ position: 'absolute', top: '.5em', left: '.5em', color: invertColor(props.Colour || '000000') }}>code</i>
                }
            </div>
            <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9 ta-left ta-center-sm">
                <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{name}</h2>
                <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{group}</h3>
                {
                    props?.Description
                        ? <h5 className="ta-left ta-center-sm">
                            <DecriptionRegexHighlightText
                                orig={props.Description}
                                controlLookup={props.controlLookup}
                            />
                        </h5>
                        : null
                }
                {props.children}
                {
                    props?.Link
                        ? <div style={{ marginTop: '2em', marginBottom: '.25em', textAlign: 'left' }}>
                            <AdditionalInfoChip text={name + '  '} onClick={props.Link}>
                                <i className="material-icons noselect" style={{ verticalAlign: 'middle' }}>read_more</i>
                            </AdditionalInfoChip>
                        </div>
                        : null
                }
            </div>
        </div>
    );
}

export const ItemHeaderRow = withServices<IWithoutDepInj, IWithDepInj>(
    ItemHeaderRowUnconnected,
    (services: IDependencyInjection) => ({
        toastService: services.toastService,
    })
);

