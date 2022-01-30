import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { getStringDialog } from '../../helper/dialogHelper';
import { newGuid } from '../../helper/guidHelper';
import { anyObject } from '../../helper/typescriptHacks';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { mapDispatchToProps, mapStateToProps, IReduxProps } from './addEditPortal.Redux';
import { AddEditPortalPresenter } from './addEditPortalPresenter';

interface IWithDepInj { }
interface IWithoutDepInj { }
interface IProps extends IWithoutDepInj, IReduxProps { }


export const AddEditPortalContainerUnconnected: React.FC<IProps> = (props: IProps) => {
    let location = useLocation();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [record, setRecord] = useState<PortalRecord>(anyObject);

    useEffect(() => {
        // Had to use spread, otherwise this item would sometimes have data when it shouldn't
        const portalItem: PortalRecord = { ...(location?.state ?? anyObject).item };
        const isEdit = portalItem.Uuid != null;

        if (!isEdit) {
            portalItem.Uuid = newGuid();
        }
        if (portalItem.Name == null) {
            portalItem.Name = i18next.t(LocaleKey.newPortalEntry);
        }

        setIsEdit(isEdit);
        setRecord(portalItem);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const editName = async () => {
        const newName = await getStringDialog(i18next.t(LocaleKey.name), record.Name);
        if (newName == null) return;
        setRecord({ ...record, Name: newName });
    }

    const addCode = (newcode: number) => {
        const codes = record.Codes || [];
        if (codes.length >= 12) return;
        setRecord({ ...record, Codes: [...codes, newcode] });
    }

    const backspaceCode = () => {
        const codes = record.Codes || [];
        setRecord({ ...record, Codes: [...codes.slice(0, codes.length - 1)] });
    }

    const deleteAllCode = () => {
        setRecord({ ...record, Codes: [] });
    }

    const addTag = async () => {
        const newTag = await getStringDialog(i18next.t(LocaleKey.name), record.Name);
        if (newTag == null) return;
        const tags = record.Tags || [];
        setRecord({ ...record, Tags: [...tags, newTag] });
    }

    const removeTag = async (tagToRemove: string) => {
        const tags = record.Tags || [];
        const removeIndex = tags.findIndex((t: string) => t === tagToRemove);
        const newTags = removeIndex >= 0 ? [...tags.slice(0, removeIndex), ...tags.slice(removeIndex + 1, tags.length)] : tags;
        setRecord({ ...record, Tags: [...newTags] });
    }


    return (
        <AddEditPortalPresenter
            {...props}
            isEdit={isEdit}
            record={record}
            editName={editName}
            addCode={addCode}
            backspaceCode={backspaceCode}
            deleteAllCode={deleteAllCode}
            addTag={addTag}
            removeTag={removeTag}
        />
    );
}

export const AddEditPortalContainer = withServices<IWithoutDepInj, IWithDepInj>(
    connect(mapStateToProps, mapDispatchToProps)(AddEditPortalContainerUnconnected),
    (services: IDependencyInjection) => ({})
);
