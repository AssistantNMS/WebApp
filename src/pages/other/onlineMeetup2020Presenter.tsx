import React, { ReactNode } from 'react';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { Error } from '../../components/core/error/error';
import { HeadComponent } from '../../components/core/headComponent';
import { SmallLoading } from '../../components/core/loading/loading';
import { NavBar } from '../../components/core/navbar/navbar';
import { NetworkState } from '../../constants/NetworkState';
import { OnlineMeetup2020SubmissionViewModel } from '../../contracts/generated/onlineMeetup2020SubmissionViewModel';
import './_onlineMeetup.scss';

interface IProps {
    items: Array<OnlineMeetup2020SubmissionViewModel>;
    status: NetworkState;
}

export const OnlineMeetup2020SubmissionPresenter: React.FC<IProps> = (props: IProps) => {
    const handleLoadingOrError = (displayFunc: (props: IProps) => ReactNode): ReactNode => {
        if (props.status === NetworkState.Loading) return <SmallLoading />;
        if (props.status === NetworkState.Error ||
            props.items == null || props.items.length < 1) {
            return (<Error />);
        }
        return displayFunc(props);
    }

    const displayMeetupSubmissions = (items: Array<OnlineMeetup2020SubmissionViewModel>) => {
        const submissions = [];
        for (const item of items) {
            submissions.push(
                <div key={item.guid} className="item">
                    <div className="card">
                        {
                            (item.imageUrl != null && item.imageUrl.length > 1)
                                ? <div className="card-image">
                                    <img src={item.imageUrl} alt="Submission" />
                                </div>
                                : null
                        }
                        <div className="card-content row">
                            <div className="col-12">
                                <div className="user-details">
                                    <div className="user-image">
                                        <img src={item.userImage} className="user" alt="User Icon" />
                                    </div>
                                    <div className="user-name">
                                        <h3>{item.userName}</h3>
                                    </div>
                                    {
                                        (item.externalUrl != null && item.externalUrl.length > 1)
                                            ? <a href={item.externalUrl} className="external-link" rel="noopener noreferrer">
                                                <i className="material-icons">open_in_new</i>
                                            </a>
                                            : null
                                    }
                                </div>
                            </div>
                            {
                                (item.text != null && item.text.length > 1)
                                    ? <div className="col-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <hr />
                                        <p className="user-text">{item.text}</p>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="row max100">
                <div className="masonry">
                    {submissions}
                </div>
            </div>
        );
    }
    return (
        <DefaultAnimation>
            <HeadComponent title="Online Meetup 2020" />
            <NavBar title="Online Meetup 2020" />
            <div className="content">
                <div className="container full pt1">
                    {handleLoadingOrError((localProps: IProps) => displayMeetupSubmissions(localProps.items))}
                    <br />
                </div>
            </div>
        </DefaultAnimation>
    );

}
