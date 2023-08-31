import React from 'react';

interface IProps {
    percentage: number;
    additionalText?: string;
}

export const ProgressBar = (props: IProps) => {
    const percentageString = `${props.percentage}%`;
    return (
        <div className="progress custom" style={{ textAlign: 'center' }}>
            <div className="progress-bar" role="progressbar"
                aria-valuenow={props.percentage} aria-valuemin={0} aria-valuemax={100}
                style={{ width: percentageString }}>
            </div>
            <span className="text">
                {props.percentage > 0 && (<span>{percentageString}&nbsp;-&nbsp;</span>)}
                {props.additionalText != null && <span>{props.additionalText}</span>}
            </span>
        </div>
    )
}