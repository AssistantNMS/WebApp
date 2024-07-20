import React, { useState } from 'react';

import { translate } from '../localization/Translate';
import { LocaleKey } from '../localization/LocaleKey';
import { ToastService } from '../services/toastService';
import { LazyLoadImage } from './core/lazyLoadImage/lazyLoadImage';
import { BaseDialog } from './common/dialog/baseDialog';
import { ShareFloatingActionButton } from './floatingActionButton/shareFloatingActionButton';
import { itemNameUrlMapper } from '../helper/stringHelper';
import { OnClickEvent } from '../helper/typescriptHacks';

interface IProps {
  id: string;
  itemName: string;
  selectedLanguage: string;
  toastService: ToastService;
}

export const ShareDialog: React.FC<IProps> = (props: IProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [forceLang, setForceLang] = useState(false);
  const [includeName, setIncludeName] = useState(false);

  const params = [];
  if (forceLang) {
    params.push(`lang=${props.selectedLanguage}`);
  }
  if (includeName) {
    params.push(itemNameUrlMapper(props.itemName));
  }
  const paramString = params.length > 0 ? '?' + params.join('&') : '';
  const baseShareableLink = 'https://app.nmsassistant.com/link';
  let fullLink = `${baseShareableLink}/${props.selectedLanguage}/${props.id}.html${paramString}`;
  if (props.selectedLanguage === 'en') {
    fullLink = `${baseShareableLink}/${props.id}.html${paramString}`;
  }
  const shareContent: string = translate(LocaleKey.shareContent) + ' \n' + fullLink;
  const waShareContent: string = translate(LocaleKey.shareContent).replace(/\s{1}[#]\w+/g, '');
  const fbShareContent: string = 'https://www.facebook.com/sharer/sharer.php?u=https://nmsassistant.com';

  const copyFunc = (e: OnClickEvent) => {
    e?.preventDefault?.();
    navigator?.clipboard?.writeText?.(fullLink)?.then?.(() => {
      props.toastService.success(<span>Copied!</span>);
    });
  };

  return (
    <>
      {ShareFloatingActionButton(() => setModalOpen(true))}
      <BaseDialog isOpen={isModalOpen} closeModal={() => setModalOpen(!isModalOpen)}>
        <div className="btn-share">
          <input type="text" className="form-control input-url" readOnly value={fullLink} style={{ marginTop: '0.5em', marginBottom: '0.5em' }} />
          <div className="row">
            <ShareDialogCheckbox isChecked={forceLang} name="Force language" onChecked={() => setForceLang(!forceLang)} />
            <ShareDialogCheckbox isChecked={includeName} name="Include name" onChecked={() => setIncludeName(!includeName)} />
          </div>
          <div className="row pt1"></div>
          <ul className="clearfix">
            <li>
              <a href="https://app.nmsassistant.com" onClick={copyFunc} className="share-button share">
                <i className="material-icons" title="copy">
                  content_copy
                </i>
              </a>
            </li>
            <li>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`}
                className="share-button twitter"
                title="twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LazyLoadImage src="/assets/images/twitter.svg" alt="Twitter" />
              </a>
            </li>
            <li>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waShareContent)}`}
                className="share-button whatsapp"
                title="Whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LazyLoadImage src="/assets/images/whatsapp.svg" alt="Whatsapp" />
              </a>
            </li>
            <li>
              <a href={fbShareContent} className="share-button facebook" title="Facebook" target="_blank" rel="noopener noreferrer">
                <LazyLoadImage src="/assets/images/facebook.svg" alt="Facebook" />
              </a>
            </li>
          </ul>
        </div>
      </BaseDialog>
    </>
  );
};

interface IShareDialogCheckboxProps {
  isChecked: boolean;
  name: string;
  onChecked: (newBool: boolean) => void;
}
export const ShareDialogCheckbox: React.FC<IShareDialogCheckboxProps> = (props: IShareDialogCheckboxProps) => {
  return (
    <div className="col-12 pt1">
      <div className="form-check">
        <label className="form-check-label custom dark">
          <input type="checkbox" className="form-check-input" onChange={() => props.onChecked(!props.isChecked)} checked={props.isChecked} />
          <span className="form-check-sign">
            <span className="check"></span>
          </span>
          {props.name}
        </label>
      </div>
    </div>
  );
};
