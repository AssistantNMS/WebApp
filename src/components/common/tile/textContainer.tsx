
import * as React from 'react';

export const TextContainer = (props: { text: string, additionalCss?: string }) => (
    <div className={`text-container ${props.additionalCss || ''}`}>
        <p>{props.text}</p>
    </div>
);
