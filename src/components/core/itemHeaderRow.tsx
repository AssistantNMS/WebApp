import React from 'react';
import { LazyLoadImage } from './lazyLoadImage/lazyLoadImage';
import { AdditionalInfoChip } from '../common/chip/additionalInfoChip';
import { invertColor } from '../../helper/colourHelper';
import { showShareDialog } from '../shareDialog';
import { ToastService } from '../../services/toastService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';

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
    Description?: string;
    Link?: any;
}

interface IProps extends IWithDepInj, IWithoutDepInj { }

const ItemHeaderRowUnconnected: React.FC<IProps> = (props: IProps) => {
    const name = props?.Name ?? '...';
    const group = props?.Group ?? '...';

    const shareDialogProps = {
        id: props.Id!,
        toastService: props.toastService,
    }

    return (
        <div className="row border-bottom">
            <div className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container"
                style={{ backgroundColor: `#${props.Colour}`, position: 'relative' }}>
                {
                    (props?.Icon != null)
                        ? <LazyLoadImage src={`/assets/images/${props?.Icon ?? ''}`} alt={name} style={{ maxWidth: '100%' }} />
                        : null
                }
                {
                    props.CdnUrl &&
                    <a href={props.CdnUrl} title={props.Name} rel="noopener noreferrer" target="_blank">
                        <i className="material-icons" style={{ position: 'absolute', top: '.5em', right: '.5em', color: invertColor(props.Colour || '000000') }}>hd</i>
                    </a>
                }
            </div>
            <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9">
                <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>{name}</h2>
                <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>{group}</h3>
                {
                    props?.Description
                        ? <h5 className="ta-left ta-center-sm">{props.Description}</h5>
                        : null
                }
                {
                    props?.Link
                        ? <div style={{ marginBottom: '.25em', textAlign: 'left' }}>
                            <AdditionalInfoChip text={name + '  '} onClick={props.Link}>
                                <i className="material-icons" style={{ verticalAlign: 'middle' }}>read_more</i>
                            </AdditionalInfoChip>
                        </div>
                        : null
                }
                {
                    (props.Id != null) &&
                    (
                        <div className="additional-header-column">
                            <i className="material-icons x2 pointer" onClick={() => showShareDialog(shareDialogProps)}>share</i>
                        </div>
                    )
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

