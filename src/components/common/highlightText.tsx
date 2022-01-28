import React from 'react';

interface IProps {
    orig: string;
    search?: string;
}

export const HighlightText: React.FC<IProps> = (props: IProps) => {
    // if (props.search == null || props.search.length < 0) {
    return (
        <>
            <br />
            <small>{props.orig}</small>
        </>
    );
    // }

    // const textArray = props.orig.split(props.search);
    // console.log(textArray);
    // return (
    //     <>
    //         <br />
    //         <small>
    //             {
    //                 textArray.map(ta => {
    //                     return (
    //                         <>
    //                             <span>{ta}</span>
    //                             <span className="highlight">{props.orig}</span>
    //                         </>
    //                     );
    //                 })
    //             }
    //         </small>
    //     </>
    // );
}