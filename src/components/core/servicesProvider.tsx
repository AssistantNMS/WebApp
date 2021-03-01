import React from "react";
import { anyObject } from "../../helper/typescriptHacks";
import { ApiService } from "../../services/ApiService";
import { AssistantAppsApiService } from "../../services/AssistantAppsApiService";

export interface IServices {
    apiService: ApiService;
    assistantAppsApiService: AssistantAppsApiService;
}

type GetServices = () => IServices;
export const defaultServicesFunc: GetServices = () => {
    return {
        apiService: new ApiService(),
        assistantAppsApiService: new AssistantAppsApiService(),
    }
}

export const ServicesContext = React.createContext<IServices>(anyObject);

export const ServicesProvider: React.FC = ({ children }) => {
    return (
        <ServicesContext.Provider value={defaultServicesFunc()}>
            {children}
        </ServicesContext.Provider>
    );
};

export function withServices(WrappedComponent: any) {
    return class extends React.Component {
        render() {
            return (
                <ServicesContext.Consumer>
                    {(services: IServices) => <WrappedComponent services={services} {...this.props} />}
                </ServicesContext.Consumer>
            );
        }
    }
}