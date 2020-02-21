import React from 'react';

interface IProps {
    title: string;
    url: string;
    imageUrl?: string;
}

export const CardButton: React.FC<IProps> = (props: IProps) => {
    return (
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="card extraMargin">
            <div className="card-header">
                {
                    props.imageUrl == null ? null :
                        <img src={props.imageUrl} alt={props.title} className="card-header-image" />
                }
                <span>{props.title} </span>
            </div>
        </a>
    );
}
