import classNames from "classnames";
import React, { useEffect, useState } from "react";

interface IProps {
    text: string;
}

export const ExpeditionAlphabetDecoder: React.FC<IProps> = (props: IProps) => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        let timer = setTimeout(() => {
            console.log(counter);
            setCounter(counter + 1)
        }, 200);
        return () => {
            clearTimeout(timer);
        };
    }, [counter]);

    const getRandomClass = () => {
        const randomPerc = Math.random() * 100;
        return randomPerc > 10 ? 'exp-font' : '';
    }

    return (
        <div className={classNames('exp-alpha white chip mb1 pointer noselect')}>
            {
                props.text.split('').map((text: string, index: number) => {
                    return (
                        <span key={`${text}-${index}`} className={classNames('char', getRandomClass())}>{text}</span>
                    );
                })
            }
        </div>
    );
}