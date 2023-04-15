import React, { useEffect, useState } from 'react';
import { dateAddMin } from '../../helper/dateHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { ToastService } from '../../services/toastService';

interface IWithDepInj {
    toastService: ToastService;
}
interface IWithoutDepInj { }

interface IProps extends IWithDepInj, IWithoutDepInj { }

export const OnlineNotificationUnconnected: React.FC<IProps> = (props: IProps) => {
    const [startUpDate] = useState(dateAddMin(new Date(), 1).toDate());
    const [isOnline, setIsOnline] = useState(window.navigator?.onLine ?? true);

    const updateNetwork = () => {
        setIsOnline(window.navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener("offline", updateNetwork);

        window.addEventListener("online", updateNetwork);

        return () => {
            window.removeEventListener("offline", updateNetwork);

            window.removeEventListener("online", updateNetwork);
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const timeNow = (new Date()).getTime();
        if (timeNow < startUpDate.getTime()) {
            return;
        }

        if (isOnline === false) {
            props.toastService.error('Offline')
        }
        if (isOnline === true) {
            props.toastService.success('Online')
        }
        // eslint-disable-next-line
    }, [isOnline]);

    return (
        <div className="network-container">
            {
                (isOnline) ? null : (
                    <div className="network-main-panel noselect">
                        <div className="alert alert-full alert-error row">
                            <i className="material-icons">error</i>&nbsp;&nbsp;
                            <span style={{ paddingTop: '0.15em' }}>You need to have an active internet connection to access the app's content</span>
                            &nbsp;&nbsp;<i className="material-icons">error</i>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export const OnlineNotification = withServices<IWithoutDepInj, IWithDepInj>(
    OnlineNotificationUnconnected,
    (services: IDependencyInjection) => ({
        toastService: services.toastService,
    })
);
