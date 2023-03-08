import React from "react";
import { connect } from "react-redux";
import { AppImage } from "../../constants/AppImage";
import { hideMobile } from "../../redux/modules/setting/action";
import { getMobileHide } from "../../redux/modules/setting/selector";
import State from "../../redux/state";
import { BasicLink } from "../core/link";
import { PositiveButton } from "./button/positiveButton";

export interface IStateProps {
    showMobileTip: boolean;
}

export interface IStateDispatch {
    hideMobile: () => void;
}

interface ISegmentedControlProps extends IStateProps, IStateDispatch { }

export const UseNativeAppUnconnected: React.FC<ISegmentedControlProps> = (props: ISegmentedControlProps) => {

    if (props.showMobileTip === false) {
        return (<></>);
    }

    return (
        <>
            <div onClick={() => props.hideMobile()} className="full-page-loader opacity80 use-mobile-popup-visibility"></div>
            <div className="use-mobile-popup use-mobile-popup-visibility" key={props.showMobileTip.toString()}>
                <div className="use-mobile-popup-content">
                    <div className="image-content">
                        <img src={AppImage.nativeApp()} alt="Native app" />
                    </div>
                    <div className="text-content">
                        <h3>Do you want a better mobile experience?</h3>
                        <p>This WebApp is not as mobile responsive or as fast as the mobile app, please consider using the app instead!</p>

                        <div className="actions">
                            <PositiveButton onClick={props.hideMobile}>
                                <BasicLink href="https://nmsassistant.com/Downloads.html">Download</BasicLink>
                            </PositiveButton>
                            <PositiveButton
                                additionalClass="negative"
                                onClick={props.hideMobile}
                            >
                                Don't show again
                            </PositiveButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const UseNativeApp = connect(
    (state: State): IStateProps => ({
        showMobileTip: !getMobileHide(state),
    }),
    (dispatch: any): IStateDispatch => {

        let newProps: any = {};
        newProps.hideMobile = () => {
            dispatch(hideMobile());
        };
        return { ...newProps };
    }
)(UseNativeAppUnconnected);
