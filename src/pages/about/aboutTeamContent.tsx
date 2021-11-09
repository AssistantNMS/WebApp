import React, { useEffect, useState } from 'react';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { DataJsonService } from '../../services/json/DataJsonService';
import { ImageContainer } from '../../components/common/tile/imageContainer';
import { TextContainer } from '../../components/common/tile/textContainer';
import { AssistantAppsTeam } from '../../contracts/data/assistantAppsTeam';

interface IWithDepInj {
    dataJsonService: DataJsonService;
}

interface IWithoutDepInj {
}

interface IProps extends IWithDepInj, IWithoutDepInj {
}

const AboutTeamContentUnconnected: React.FC<IProps> = (props: IProps) => {
    const [appMembers, setAppMembers] = useState<Array<AssistantAppsTeam>>();

    useEffect(() => {
        loadAppMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadAppMembers = async () => {
        const appMembersJson = await props.dataJsonService.getAssistantAppsTeamMembers();
        if (appMembersJson.isSuccess) setAppMembers(appMembersJson.value);
    }

    return (
        <>
            <div className="generic-item-list row mb-2em">
                <div className="col-12">
                    <br />
                </div>
                <div className="col-12 mb-2em">
                    {
                        (appMembers ?? []).map((appl: AssistantAppsTeam) => {
                            return (
                                <ListTile
                                    key={appl.name}
                                    item={appl}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export const AboutTeamContent = withServices<IWithoutDepInj, IWithDepInj>(
    AboutTeamContentUnconnected,
    (services: IDependencyInjection) => ({
        dataJsonService: services.dataJsonService,
    })
);


interface IAssistantAppTeamListTileProps {
    item: AssistantAppsTeam;
}

const ListTile: React.FC<IAssistantAppTeamListTileProps> = (props: IAssistantAppTeamListTileProps) => (
    <div className="row justify">
        <div className="gen-item col-12 col-xl-5 col-lg-8 col-md-10 col-sm-10 col-xs-12">
            <div className="gen-item-container" draggable={false}>
                <ImageContainer Icon={props.item.imageUrl} Name={props.item.name} IsExternal={true} />
                <div className="gen-item-content-container">
                    <TextContainer text={props.item.name} />
                    <div className="quantity-container">
                        <h4>{props.item.role}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
)