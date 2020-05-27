import i18next from 'i18next';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { newGuid } from '../../helper/guidHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps } from './addEditPortal.Redux';
import { AddEditPortalPresenter } from './addEditPortalPresenter';

interface IProps {
    location: any;
    match: any;
    history: any;
    isDark: boolean;
    useAltGlyphs: boolean;
    tags: Array<string>;
    availableTags: Array<string>;
    addPortal?: (portalRecord: PortalRecord) => void;
    editPortal?: (portalRecord: PortalRecord) => void;
    toggleAltGlyphs?: () => void;
}

interface IState {
    isEdit: boolean;
    item: PortalRecord;
}

export class AddEditPortalContainerUnconnected extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const portalItem: PortalRecord = this.props.location?.state || anyObject;
        const isEdit = portalItem.Uuid != null;
        if (!isEdit) {
            portalItem.Uuid = newGuid();
        }
        if (portalItem.Name == null) {
            portalItem.Name = i18next.t(LocaleKey.newPortalEntry);
        }

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

    addTag = async () => {
        const { value: newTag } = await Swal.fire({
            title: i18next.t(LocaleKey.addTag),
            input: 'text',
            inputValue: '',
            showCancelButton: true
        });
        if (newTag == null) return;
        const tags = this.state.item.Tags || [];
        this.setState(() => {
            return {
                item: { ...this.state.item, Tags: [...tags, newTag] }
            };
        })
    }

    render() {
        return (
            <AddEditPortalPresenter
                {...this.state} {...this.props}
                editName={this.editName}
                addCode={this.addCode}
                backspaceCode={this.backspaceCode}
                deleteAllCode={this.deleteAllCode}
                addTag={this.addTag}
            />
        );
    }

}

export const AddEditPortalContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(AddEditPortalContainerUnconnected));
