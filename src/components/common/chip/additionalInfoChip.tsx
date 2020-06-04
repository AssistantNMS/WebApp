
import React from 'react';

interface IChipRowProps {
    additionalData: Array<any>;
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
                props.additionalData.map((item: any, index: number) => {
                    return (
                        <div key={`additional-data-${index}`} className="secondary chip extra-padding" style={{ padding: '.25em 1em', margin: '0 .25em' }}>
                            <span>{item.text}&nbsp;</span>
                            {getImage(item)}
                        </div>
                    )
                })
            }
        </div>
    );
}

