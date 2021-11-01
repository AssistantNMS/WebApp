import i18next from 'i18next';
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { LocaleKey } from '../localization/LocaleKey';

export const showShareDialog = (id: string): void => {
    const MySwal = withReactContent(Swal);

    const copyFunc = (e: any) => {
        e?.preventDefault?.();
    }

    MySwal.fire({
        html: (
            <div className="btn-share">
                <input type="text"
                    className="form-control"
                    value={`https://app.nmsassistant.com/link/${id}`}
                />
                <ul className="clearfix">
                    <li>
                        <a href="https://app.nmsassistant.com" onClick={copyFunc} className="share-button share">
                            <i className="material-icons">content_copy</i>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/berkpw" className="share-button twitter entypo-twitter" title="twitter" target="_blank" rel="noopener noreferrer">
                            TW
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/share.php?u=" className="share-button facebook entypo-facebook" title="facebook" target="_blank" rel="noopener noreferrer">
                            FB
                        </a>
                    </li>
                    <li>
                        <a href="https://plus.google.com/" className="share-button google entypo-gplus" title="google" target="_blank" rel="noopener noreferrer">
                            G
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