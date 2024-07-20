import React from 'react';
import { connect } from 'react-redux';
import { NetworkState } from '../../constants/NetworkState';

import { defaultConfig } from '../../utils';
import { VersionSearchViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionSearchViewModel';
import { WhatIsNewPresenter } from './whatIsNewPresenter';
import { IReduxProps, mapStateToProps, mapDispatchToProps } from './whatIsNew.Redux';
import { PlatformType } from '../../contracts/generated/AssistantApps/Enum/platformType';
import { VersionViewModel } from '../../contracts/generated/AssistantApps/ViewModel/Version/versionViewModel';
import { AssistantAppsApiService } from '../../services/api/AssistantAppsApiService';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';

interface IWithDepInj {
  assistantAppsApiService: AssistantAppsApiService;
}
interface IWithoutDepInj {}
interface IProps extends IWithDepInj, IWithoutDepInj, IReduxProps {}

interface IState {
  whatIsNewItems: Array<VersionViewModel>;
  whatIsNewStatus: NetworkState;
  whatIsNewSearchObj: VersionSearchViewModel;
}

export class WhatIsNewContainerUnconnected extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      whatIsNewItems: [],
      whatIsNewStatus: NetworkState.Loading,
      whatIsNewSearchObj: {
        appGuid: window.config?.assistantAppsAppGuid ?? defaultConfig.assistantAppsAppGuid,
        platforms: [PlatformType.web],
        languageCode: props.language,
        page: 1,
      },
    };

    const { whatIsNewSearchObj } = this.state;
    this.fetchWhatIsNewItems(whatIsNewSearchObj);
  }

  fetchWhatIsNewItems = async (whatIsNewSearchObj: VersionSearchViewModel) => {
    const service = this.props.assistantAppsApiService;
    const whatIsNewListResult = await service.getWhatIsNewItems(whatIsNewSearchObj);
    if (!whatIsNewListResult.isSuccess) {
      this.setState(() => {
        return {
          whatIsNewStatus: NetworkState.Error,
        };
      });
      return;
    }
    this.setState(() => {
      return {
        whatIsNewItems: whatIsNewListResult.value,
        whatIsNewStatus: NetworkState.Success,
      };
    });
  };

  render() {
    return <WhatIsNewPresenter {...this.state} />;
  }
}

export const WhatIsNewContainer = withServices<IWithoutDepInj, IWithDepInj>(
  connect(mapStateToProps, mapDispatchToProps)(WhatIsNewContainerUnconnected),
  (services: IDependencyInjection) => ({
    assistantAppsApiService: services.assistantAppsApiService,
  }),
);
