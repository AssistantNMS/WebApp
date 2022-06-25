import React, { ReactNode } from "react";
import classNames from "classnames";
import { site } from "../../constants/Site";

interface IProps {
    href: string;
    title?: string;
    additionalClassNames?: string;
    children?: ReactNode;
}
export const BasicLink = (props: IProps) => {
    const appendRef = (baseUrl: string) => {
        if (baseUrl.includes('@')) return baseUrl; // Emails
        if (baseUrl.includes('?')) { // Already has query params
            return baseUrl + `&ref=${site.ref}`;
        }
        return baseUrl + `?ref=${site.ref}`;
    };

    const { href, additionalClassNames, children, ...aProps } = props;
    return (
        <a  {...aProps}
            href={appendRef(href)}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(additionalClassNames ?? '')}
            draggable={false}>
            {children}
        </a>
    );
}