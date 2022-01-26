export interface DevDetail {
    Id: string;
    Properties: Array<DevDetailProperty>;
}

export interface DevDetailProperty {
    Name: string;
    Value: string;
    Type: number;
}
