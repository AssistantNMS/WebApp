import { State } from '../../redux/state';

export const mapStateToProps = (state: State) => {
    return {
    };
};

export const mapDispatchToProps = (dispatch: any) => {

    let newProps: any = {};
    // newProps.addPortal = (portalRecord: PortalRecord) => {
    //     dispatch(addPortal(portalRecord));
    // };
    return { ...newProps };
}