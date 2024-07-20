import React from 'react';
import { connect } from 'react-redux';
import { GoogleSignedInState } from '../../contracts/enum/GoogleSignedInState';
import { SyncPresenter } from './syncPresenter';
import { mapStateToProps, mapDispatchToProps } from './sync.Redux';

interface IProps {}

interface IState {
  name: string;
  email: string;
  imageUrl: string;
  status: GoogleSignedInState;
}

// https://developers.google.com/drive/api/v3/manage-downloads

export class SyncContainerUnconnected extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      imageUrl: '',
      status: GoogleSignedInState.Default,
    };
  }

  componentDidMount() {}

  successfulSignIn = (googleSignInEvent: any) => {
    this.setState(() => {
      return {
        name: googleSignInEvent.profileObj.name,
        email: googleSignInEvent.profileObj.email,
        imageUrl: googleSignInEvent.profileObj.imageUrl,
        status: GoogleSignedInState.Success,
      };
    });
  };

  failedSignIn = () => {
    this.setState(() => {
      return {
        name: '',
        email: '',
        imageUrl: '',
        status: GoogleSignedInState.Failed,
      };
    });
  };

  logout = () => {
    this.setState(() => {
      return {
        name: '',
        email: '',
        imageUrl: '',
        status: GoogleSignedInState.Default,
      };
    });
  };

  render() {
    return (
      <SyncPresenter {...this.state} {...this.props} successfulSignIn={this.successfulSignIn} failedSignIn={this.failedSignIn} logout={this.logout} />
    );
  }
}

export const SyncContainer = connect(mapStateToProps, mapDispatchToProps)(SyncContainerUnconnected);
