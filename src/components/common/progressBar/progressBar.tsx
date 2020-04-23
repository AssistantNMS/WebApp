import React from 'react';

interface IProps {
    percentage: number;
}

export const ProgressBar = (props: IProps) => {
    const percentageString = `${props.percentage}%`;
    return (
        <div className="progress custom">
            <div className="progress-bar" role="progressbar"
                aria-valuenow={props.percentage} aria-valuemin={0} aria-valuemax={100}
                style={{ width: percentageString }}>
                <span className="text">{percentageString}</span>
            </div>
        </div>
    )
}