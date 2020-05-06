import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { NavBar } from '../../components/core/navbar/navbar';
import { ApplyFloatingActionButton } from '../../components/floatingActionButton/applyFloatingActionButton';
import * as Route from '../../constants/Route';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { setDocumentTitle } from '../../helper/DocumentHelper';
import { anyObject } from '../../helper/TypescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './addEditPortal.Redux';
import { PortalGlyphGridDisplay, PortalGlyphKeypadGrid } from './portalGlyphGrid';

interface IProps {
    location: any;
    match: any;
    history: any;
    isDark: boolean;
    useAltGlyphs: boolean;
    availableTags: Array<string>;
    addPortal?: (portalRecord: PortalRecord) => void;
    toggleAltGlyphs?: () => void;
}

interface IState {
    isEdit: boolean;
    item: PortalRecord;
}

export class AddEditPortalPresenterUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const portalItem: PortalRecord = this.props.location?.state?.item || anyObject;
        const isEdit = portalItem != null;
        if (isEdit && portalItem.Name == null) {
            portalItem.Name = i18next.t(LocaleKey.newPortalEntry);
        }

        setDocumentTitle(portalItem.Name);

        this.state = {
            isEdit,
            item: portalItem
        }
    }

    editName = async () => {
        const { value: newName } = await Swal.fire({
            title: i18next.t(LocaleKey.portalName),
            input: 'text',
            inputValue: this.state.item.Name,
            showCancelButton: true
        });
        if (newName == null) return;
        this.setState(() => {
            return {
                item: { ...this.state.item, Name: newName }
            };
        })
    }

    addCode = (newcode: number) => {
        const codes = this.state.item.Codes || [];
        if (codes.length >= 12) return;
        this.setState(() => {
            return {
                item: { ...this.state.item, Codes: [...codes, newcode] }
            };
        })
    }

    backspaceCode = () => {
        const codes = this.state.item.Codes || [];
        this.setState(() => {
            return {
                item: { ...this.state.item, Codes: [...codes.slice(0, codes.length - 1)] }
            };
        })
    }

    deleteAllCode = () => {
        this.setState(() => {
            return {
                item: { ...this.state.item, Codes: [] }
            };
        })
    }

    render() {
        return (
            <>
                <NavBar title={this.state.item.Name} additionalItems={[
                    <li key={`editPortalName`} className="nav-item" onClick={this.editName}>
                        <span className="nav-link pointer">
                            <i className="material-icons">edit</i>
                        </span>
                    </li>
                ]} />
                <div className="content">
                    <div className="row full pt1">
                        <div className="col-12">
                            <PortalGlyphGridDisplay
                                codes={this.state.item.Codes || []}
                                isDark={this.props.isDark}
                                useAltGlyph={this.props.useAltGlyphs}
                            />
                        </div>
                    </div>
                    <div className="row full">
                        <div className="col-6 col-md-4">
                            <button type="button" onClick={this.backspaceCode} className="btn btn-warning">
                                <i className="material-icons">backspace</i>
                            </button>
                        </div>
                        <div className="col-6 col-md-4">
                            <button type="button" onClick={this.deleteAllCode} className="btn btn-danger">
                                <i className="material-icons">clear</i>
                            </button>
                        </div>
                        <div className="col-12 col-md-4 togglebutton">
                            <label style={{ color: 'white' }}>
                                {i18next.t(LocaleKey.useAltGlyphs)}&nbsp;
                                <input type="checkbox" checked={this.props.useAltGlyphs} onChange={(e: any) => {
                                    if (this.props.toggleAltGlyphs) this.props.toggleAltGlyphs();
                                }} />
                                <span className="toggle"></span>
                            </label>
                        </div>
                    </div>
                    <div className="row full">
                        <div className="col-12">
                            <PortalGlyphKeypadGrid
                                isDark={this.props.isDark}
                                useAltGlyph={this.props.useAltGlyphs}
                                onPortalClick={this.addCode}
                            />
                        </div>
                    </div>
                </div>
                {
                    (this.state.item != null && this.state.item.Codes != null && this.state.item.Codes.length === 12)
                        ? ApplyFloatingActionButton('portal-add-edit', () => {
                            if (this.props.addPortal) {
                                this.props.addPortal(this.state.item);
                                this.props.history.push({
                                    pathname: Route.portal,
                                });
                            }
                        })
                        : null
                }
                <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
            </>
        );
    }

}
export const AddEditPortalPresenter = connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEditPortalPresenterUnconnected));