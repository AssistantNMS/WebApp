import i18next from 'i18next';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultAnimation } from '../../components/common/animation/defaultAnim';
import { PortalGlyphGridDisplay, PortalGlyphKeypadGrid } from '../../components/common/portal/portalGlyphGrid';
import { HeadComponent } from '../../components/core/headComponent';
import { NavBar } from '../../components/core/navbar/navbar';
import { ApplyFloatingActionButton } from '../../components/floatingActionButton/applyFloatingActionButton';
import { BaseFloatingActionButton } from '../../components/floatingActionButton/baseFloatingActionButton';
import * as Route from '../../constants/Route';
import { PortalRecord } from '../../contracts/portal/portalRecord';
import { LocaleKey } from '../../localization/LocaleKey';

interface IProps {
    // Container Props
    useAltGlyphs: boolean;
    tags: Array<string>;
    availableTags: Array<string>;
    addPortal?: (portalRecord: PortalRecord) => void;
    editPortal?: (portalRecord: PortalRecord) => void;
    toggleAltGlyphs?: () => void;

    // Container State
    isEdit: boolean;
    record: PortalRecord;

    // Container Specific
    editName: () => void;
    addCode: (newcode: number) => void;
    backspaceCode: () => void;
    deleteAllCode: () => void;
    addTag: () => void;
    removeTag: (tagToRemove: string) => void;
}

export const AddEditPortalPresenter: React.FC<IProps> = (props: IProps) => {
    const navigate = useNavigate();

    const displayTags = (tags: Array<string>) => {
        return (
            <div className="row justify" style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                {
                    (tags || []).map((item: string, index: number) => {
                        return (
                            <span key={`portalTag: ${item}-${index}`} onClick={() => props.removeTag(item)}
                                className="secondary chip extra-padding pointer">{item}</span>
                        );
                    })
                }
                <span key={`portalTag-add`} onClick={props.addTag} className="secondary chip extra-padding pointer">+</span>
            </div>
        );
    };
    return (
        <DefaultAnimation>
            <HeadComponent title={props.record.Name} />
            <NavBar title={props.record.Name} additionalItems={[
                <BaseFloatingActionButton
                    keyString={`editPortalName`}
                    icon={<i className="material-icons">edit</i>}
                    onClick={props.editName}
                />
            ]} />
            <div className="content">
                <div className="row full pt1">
                    <div className="col-12">
                        <PortalGlyphGridDisplay
                            codes={props.record.Codes || []}
                            useAltGlyphs={props.useAltGlyphs}
                        />
                    </div>
                </div>
                <div className="row full">
                    <div className="col-6 col-md-4">
                        <button type="button" onClick={props.backspaceCode} className="btn btn-warning">
                            <i className="material-icons">backspace</i>
                        </button>
                    </div>
                    <div className="col-6 col-md-4">
                        <button type="button" onClick={props.deleteAllCode} className="btn btn-danger">
                            <i className="material-icons">clear</i>
                        </button>
                    </div>
                    <div className="col-12 col-md-4 togglebutton">
                        <label style={{ color: 'white' }}>
                            {i18next.t(LocaleKey.useAltGlyphs)}&nbsp;
                            <input type="checkbox" checked={props.useAltGlyphs} onChange={(e: any) => {
                                if (props.toggleAltGlyphs) props.toggleAltGlyphs();
                            }} />
                            <span className="toggle"></span>
                        </label>
                    </div>
                </div>
                <div className="row full">
                    <div className="col-12">
                        <PortalGlyphKeypadGrid
                            useAltGlyphs={props.useAltGlyphs}
                            onPortalClick={props.addCode}
                        />
                    </div>
                </div>
                {displayTags(props.record.Tags)}
            </div>
            {
                (props.record != null && props.record.Codes != null && props.record.Codes.length === 12)
                    ? ApplyFloatingActionButton('portal-add-edit', () => {
                        let changeFunc = props.isEdit ? props.editPortal : props.addPortal;
                        if (changeFunc != null) {
                            changeFunc(props.record);
                            navigate(Route.portal);
                        }
                    })
                    : null
            }
            <div className="col-12" style={{ marginBottom: '2em', marginTop: '2em' }}></div>
        </DefaultAnimation>
    );

}
