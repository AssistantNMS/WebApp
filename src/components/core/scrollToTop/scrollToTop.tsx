import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IProps {
    children: React.ReactNode;
}

export const ScrollToTop: React.FC<IProps> = (props: IProps) => {
    let location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return <>{props.children}</>
}