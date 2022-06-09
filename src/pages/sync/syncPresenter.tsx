import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { translate } from '../../localization/Translate';
import { CardButton } from '../../components/common/button/cardButton';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { LocaleKey } from '../../localization/LocaleKey';
import { GoogleSignedInState } from '../../contracts/enum/GoogleSignedInState';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';

interface IProps {
    // Container props
    name: string;
    email: string;
    imageUrl: string;
    status: GoogleSignedInState;

    // Container specific
    successfulSignIn: (googleSignInEvent: any) => void;
    failedSignIn: () => void;
    logout: () => void;
}

export const SyncPresenter: React.FC<IProps> = (props: IProps) => {
    const displayAccount = () => {
        if (props.status === GoogleSignedInState.Default || props.status === GoogleSignedInState.Failed) {
            return (<>
                <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                    <GoogleLogin
                        theme="dark"
                        scope="email https://www.googleapis.com/auth/drive.file"
                        clientId={window.config.googleClientId}
                        onSuccess={props.successfulSignIn}
                        onFailure={props.failedSignIn}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                </div>
            </>
            );
        }

        if (props.status === GoogleSignedInState.Success) {
            return (
                <>
                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                        <CardButton
                            title={props.name}
                            url="/"
                            imageUrl={props.imageUrl}
                        />
                    </div>
                    <div className="col-12"></div>
                    <div className="col-12 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-6">
                        <GoogleLogout
                            {...{ theme: 'dark' }}
                            clientId={window.config.googleClientId}
                            onLogoutSuccess={props.logout}
                        />
                    </div>
                    <div className="col-12"><hr style={{ marginTop: '2em' }} /></div>
                </>
            );
        }
    }

    const title = translate(LocaleKey.synchronize);
    return (
        <DefaultAnimation>
            <HeadComponent title={title} />
            <NavBar title={title} />
            <div className="content">
                <div className="container full pt1">
                    <div className="row justify">
                        {
                            (props.status === GoogleSignedInState.Loading)
                                ? <h1>Loading</h1>
                                : <>
                                    <div className="col-12"><h3>{translate(LocaleKey.account)}</h3></div>
                                    {displayAccount()}
                                </>
                        }
                    </div>
                </div>
            </div>
        </DefaultAnimation>
    );
}
