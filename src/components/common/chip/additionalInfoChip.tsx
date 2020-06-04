
import React from 'react';
import classNames from 'classnames';

interface IChipRowProps {
    additionalData: Array<IChipProps>;
}
interface IChipProps {
    text: string;
    image?: string;
    icon?: string;
    onClick?: any;
    children?: any;
}

export const AdditionalInfoChipRow: React.FC<IChipRowProps> = (props: IChipRowProps) => {
    if (props.additionalData == null || props.additionalData.length === 0) return null;

    const getImage = (item: any) => {
        if (item.image != null && item.image.length > 0) {
            return (<img src={item.image} alt={item.image} style={{ maxHeight: '20px' }} />);
        }
        if (item.icon != null && item.icon.length > 0) {
            return (<i className="material-icons" style={{ verticalAlign: 'middle' }}>{item.icon}</i>);
        }

        return null;
    }

    return (
        <div className="row justify " style={{ marginTop: '1em', paddingBottom: '.5em' }}>
            {
                props.additionalData.map((item: IChipProps, index: number) => {
                    return (
                        <AdditionalInfoChip key={`additional-data-${index}`} {...item}>
                            {getImage(item)}
                        </AdditionalInfoChip>
                    )
                })
            }
        </div>
    );
}


export const AdditionalInfoChip: React.FC<IChipProps> = (props: IChipProps) => {
    const safeClick = () => {
        if (props.onClick) props.onClick();
    }
    const styleObj = {
        padding: '.25em 1em',
        margin: '0 .25em',
        display: 'inline-block',
    }
    return (
        <div className={classNames("secondary chip extra-padding", { pointer: !!props.onClick })} style={styleObj} onClick={safeClick}>
            <span>{props.text}&nbsp;</span>
            {props.children}
        </div>
    );
}