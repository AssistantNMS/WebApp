import React, { useRef, useLayoutEffect, useState, ReactNode } from "react";

interface IProps {
    render: (width: number, height: number) => ReactNode;
}

export const SizeComponent: React.FC<IProps> = (props: IProps) => {
    const targetRef = useRef<any>();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (targetRef.current) {
            setDimensions({
                width: targetRef.current.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    return (
        <div
            ref={targetRef}
            className="sized-component"
            data-width={dimensions.width}
            data-height={dimensions.height}
        >
            {props.render(dimensions.width, dimensions.height)}
        </div>
    );
};

