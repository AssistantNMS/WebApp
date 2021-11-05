import React, { ReactNode } from 'react';
import { anyObject } from '../helper/typescriptHacks';

import { AssistantAppsApiService } from '../services/api/AssistantAppsApiService';
import { ApiService } from '../services/api/ApiService';

import { AllGameItemsService } from '../services/json/AllGameItemsService';
import { GameItemService } from '../services/json/GameItemService';
import { GuideService } from '../services/json/GuideService';
import { RechargeByService } from '../services/json/RechargeByService';
import { DataJsonService } from '../services/json/DataJsonService';
import { ToastService } from '../services/toastService';

export interface IDependencyInjection {

  //api
  assistantAppsApiService: AssistantAppsApiService;
  apiService: ApiService;

  //json
  allGameItemsService: AllGameItemsService;
  gameItemService: GameItemService;
  guideService: GuideService;
  rechargeByService: RechargeByService;

  // data
  dataJsonService: DataJsonService;

  // common
  toastService: ToastService,
}

export const defaultDependencyInjectionFunc = () => {
  const gameItemService = new GameItemService();

  return {
    //api
    assistantAppsApiService: new AssistantAppsApiService(),
    apiService: new ApiService(),

    //json
    gameItemService,
    allGameItemsService: new AllGameItemsService(gameItemService),
    guideService: new GuideService(),
    rechargeByService: new RechargeByService(),

    // data
    dataJsonService: new DataJsonService(),

    // common
    toastService: new ToastService(),
  };
};

export const DependencyInjectionContext = React.createContext<IDependencyInjection>(
  anyObject
);
interface IDependencyInjectionProviderProps {
  children: ReactNode;
}
export const DependencyInjectionProvider: React.FC<IDependencyInjectionProviderProps> = (
  props: IDependencyInjectionProviderProps
) => {
  const { children } = props;
  return (
    <DependencyInjectionContext.Provider
      value={defaultDependencyInjectionFunc()}
    >
      {children}
    </DependencyInjectionContext.Provider>
  );
};

export function withDependencyInjectionProvider<TProps>(
  WrappedComponent: any
): React.FC<TProps> {
  return (props: TProps) => (
    <DependencyInjectionContext.Provider
      value={defaultDependencyInjectionFunc()}
    >
      <WrappedComponent {...props} />
    </DependencyInjectionContext.Provider>
  );
}
export function withDependencyInjectionConsumer<
  WithoutExpectedDependencyInjectionType,
  ExpectedDependencyInjectionType
>(
  WrappedComponent: any,
  mapper: (
    DependencyInjection: IDependencyInjection
  ) => ExpectedDependencyInjectionType
) {
  const wrapper: React.FC<WithoutExpectedDependencyInjectionType> = (
    props: WithoutExpectedDependencyInjectionType
  ) => {
    return (
      <DependencyInjectionContext.Consumer>
        {(DependencyInjection: IDependencyInjection) => (
          <WrappedComponent {...mapper(DependencyInjection)} {...props} />
        )}
      </DependencyInjectionContext.Consumer>
    );
  };
  return wrapper;
}

export function withServices<WithoutExpectedServicesType, ExpectedServicesType>(WrappedComponent: any, mapper: (services: IDependencyInjection) => ExpectedServicesType) {
  const wrapper: React.FC<WithoutExpectedServicesType> = (props: WithoutExpectedServicesType) => {
    return (
      <DependencyInjectionContext.Consumer>
        {
          (services: IDependencyInjection) =>
            <WrappedComponent {...(mapper(services))} {...props} />
        }
      </DependencyInjectionContext.Consumer>
    );
  }
  return wrapper;
}