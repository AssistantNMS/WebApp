import i18next from 'i18next';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LocaleKey } from '../localization/LocaleKey';
import { LazyLoadImage } from './core/lazyLoadImage/lazyLoadImage';

export const showShareDialog = (id: string): void => {
    const MySwal = withReactContent(Swal);

    const copyFunc = (e: any) => {
        e?.preventDefault?.();
    }

    const shareableLink = `https://app.nmsassistant.com/link/${id}`;
    const shareContent: string = i18next.t(LocaleKey.shareContent) + ' \n' + shareableLink;
    const waShareContent: string = i18next.t(LocaleKey.shareContent).replace(/\s{1}[#]\w+/g, '');
    const fbShareContent: string = 'https://www.facebook.com/sharer/sharer.php?u=https://nmsassistant.com';

    MySwal.fire({
        html: (
            <div className="btn-share">
                <input type="text"
                    className="form-control"
                    value={shareableLink}
                    style={{ marginTop: '0.5em', marginBottom: '0.5em' }}
                />
                <ul className="clearfix">
                    <li>
                        <a href="https://app.nmsassistant.com" onClick={copyFunc} className="share-button share">
                            <i className="material-icons">content_copy</i>
                        </a>
                    </li>
                    <li>
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`} className="share-button twitter" title="twitter" target="_blank" rel="noopener noreferrer">
                            <LazyLoadImage src="/assets/images/twitter.svg" alt="Twitter" />
                        </a>
                    </li>
                    <li>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(waShareContent)}`} className="share-button whatsapp" title="Whatsapp" target="_blank" rel="noopener noreferrer">
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
        ),
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: i18next.t(LocaleKey.close),
    });
}