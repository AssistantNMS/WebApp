import React from "react";
import { Link } from "react-router-dom";
import { DrawerMenuItem } from "../../contracts/DrawerMenuItem";
import { DrawerIconType } from "../../contracts/enum/DrawerIconType";

interface IProps extends DrawerMenuItem { }

export const MenuGridItemPresenter: React.FC<IProps> = (props: IProps) => {

    const renderIcon = (item: DrawerMenuItem) => {
        if (item.iconType === DrawerIconType.Material) return (<i className="material-icons">{item.icon}</i>);
        if (item.iconType === DrawerIconType.Custom) return (<img className="custom-icons" src={item.icon} alt={item.icon} />);

        return null;
    }

    return (
        <div className="catalogue-item noselect" key={props.name}>
            <Link to={props.link} className="nav-link">
                {renderIcon(props)}
                <p>{props.name}</p>
            </Link>
        </div>
    );
}