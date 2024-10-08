import React from 'react';
import { ReactNode } from 'react-markdown/lib/react-markdown';
import { UsageKey } from '../../constants/UsageKey';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';
import { invertColor } from '../../helper/colourHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ToastService } from '../../services/toastService';
import { AdditionalInfoChip } from '../common/chip/additionalInfoChip';
import { DecriptionRegexHighlightText } from '../common/descriptionRegexHighlighter';
import { LazyLoadImage } from './lazyLoadImage/lazyLoadImage';

interface IWithDepInj {
  toastService: ToastService;
}
interface IWithoutDepInj {
  Colour?: string;
  Id?: string;
  Icon?: string;
  Name?: string;
  Group?: string;
  Abbrev?: string;
  CdnUrl?: string;
  Quantity?: number;
  Usages?: Array<string>;
  Description?: string;
  Link?: () => void;
  controlLookup?: Array<PlatformControlMapping>;
  children?: ReactNode;
  openDevProperties?: () => void;
}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const ItemHeaderRowUnconnected: React.FC<IProps> = (props: IProps) => {
  const name = props?.Name ?? '...';
  const group = props?.Group ?? '...';

  const hasSymbol = (props?.Abbrev?.length ?? 0) > 0;

  return (
    <div data-id="ItemHeaderRow" className="row border-bottom pos-rel header-row">
      <div
        className="col-12 col-lg-2 col-md-2 col-sm-4 col-xs-3 image-container generic-item-image-container noselect"
        style={{ backgroundColor: `#${props.Colour}`, position: 'relative' }}
      >
        {props?.Icon != null ? <LazyLoadImage src={`/assets/images/${props?.Icon ?? ''}`} alt={name} style={{ maxWidth: '100%' }} /> : null}
        {props.CdnUrl && (
          <a href={props.CdnUrl} title="HD image" rel="noopener noreferrer" target="_blank">
            <i
              className="material-icons"
              style={{ position: 'absolute', top: '.5em', right: '.5em', color: invertColor(props.Colour || '000000', true) }}
              title="HD image"
            >
              hd
            </i>
          </a>
        )}
        {props.Usages?.includes(UsageKey.hasDevProperties) && (
          <i
            className="material-icons pointer"
            onClick={props.openDevProperties}
            style={{ position: 'absolute', top: '.5em', left: '.5em', color: invertColor(props.Colour || '000000', true) }}
            title="Developer Details"
          >
            code
          </i>
        )}
      </div>
      <div className="col-12 col-lg-10 col-md-10 col-sm-8 col-xs-9 ta-left ta-center-sm">
        <h2 className="ta-left ta-center-sm" style={{ marginBottom: 0 }}>
          <span>{name}</span>
          {hasSymbol && <span>&nbsp;({props.Abbrev})</span>}
          {props.Quantity != null && props.Quantity > 0 ? (
            <span style={{ display: 'inline-block', fontSize: '0.5em', lineHeight: '1em', width: '6em', position: 'relative' }}>
              <p className="secondary chip" style={{ position: 'absolute', top: '-1.4em', left: '0.5em' }}>
                x {props.Quantity}
              </p>
            </span>
          ) : null}
        </h2>
        <h3 className="ta-left ta-center-sm" style={{ marginTop: 0 }}>
          {group}
        </h3>
        {props?.Description ? (
          <h5 className="ta-left ta-center-sm">
            <DecriptionRegexHighlightText orig={props.Description} controlLookup={props.controlLookup} />
          </h5>
        ) : null}
        {props.children}
        {props?.Link ? (
          <div style={{ marginTop: '2em', marginBottom: '.25em', textAlign: 'left' }}>
            <AdditionalInfoChip text={name + '  '} onClick={props.Link}>
              <i className="material-icons noselect" style={{ verticalAlign: 'middle' }} title="read more">
                read_more
              </i>
            </AdditionalInfoChip>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export const ItemHeaderRow = withServices<IWithoutDepInj, IWithDepInj>(ItemHeaderRowUnconnected, (services: IDependencyInjection) => ({
  toastService: services.toastService,
}));
