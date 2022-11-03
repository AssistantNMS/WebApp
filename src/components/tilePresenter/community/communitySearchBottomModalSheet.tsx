import React from "react";
import { CommunitySearchChipColourViewModel } from "../../../contracts/other/communitySearchChipColourViewModel";
import { CommunitySearchViewModel } from "../../../contracts/other/communitySearchViewModel";
import { BottomModalSheet } from "../../common/dialog/bottomModalSheet";
import { LazyLoadImage } from "../../core/lazyLoadImage/lazyLoadImage";
import { BasicLink } from "../../core/link";
import { communitySearchTags } from "./communitySearchTags";

interface IProps {
    isModalOpen: boolean;
    itemToDisplay: CommunitySearchViewModel;
    chipColours: Array<CommunitySearchChipColourViewModel>;
    setModalClosed: () => void;
}

export const CommunitySearchBottomModalSheet: React.FC<IProps> = (props: IProps) => {

    const renderSingleLink = (link: string, index: number) => {
        let localLink = link;
        let cleanLink = 'Unsupported link';
        let linkComment = '';

        const markdownLinkRegex = new RegExp(/^[(.+)]((.+))/);
        const markdownRegexArr = markdownLinkRegex.exec(link);
        if ((markdownRegexArr?.length ?? 0) > 2) {
            linkComment = `(${markdownRegexArr![1]})`;
            localLink = markdownRegexArr![2];
        }

        const linkRegex = new RegExp('^(?:https?://)?(?:[^@/]+@)?(?:www.)?([^:/?]+)');
        const preCleanLink = localLink
            .replaceAll('https://', '')
            .replaceAll('http://', '')
            .replaceAll('www.', '')
            .replaceAll('/index.html', '')
            .replaceAll('.html', '');
        const regexArr = linkRegex.exec(preCleanLink);
        cleanLink = ((regexArr?.length ?? 0) > 0) ? regexArr![0] : 'test:' + preCleanLink;

        return (
            <li key={`${index}-${link}`} style={{ maxWidth: '100%' }}>
                <BasicLink href={localLink} title={props.itemToDisplay.name} additionalClassNames="max-lines-1">
                    <span>{cleanLink}</span>
                    {
                        (linkComment.length > 0) &&
                        <span className="comment">{linkComment}</span>
                    }
                </BasicLink>
            </li>
        );
    }

    const renderContent = () => {
        if (props.isModalOpen !== true) return (<div></div>);

        return (
            <div className="row justify scrollable community-search-bottom-modal-sheet">
                <div className="col-12">
                    <div className="community-search-top pb1">
                        <div className="community-icon">
                            <LazyLoadImage
                                src={`https://community.nmscd.com${props.itemToDisplay.icon}`}
                                alt={props.itemToDisplay.name ?? props.itemToDisplay.icon}
                                draggable={false}
                            />
                        </div>
                        <div className="community-search-title">
                            <div className="community-search-title-content">{props.itemToDisplay.name}</div>
                        </div>
                    </div>
                </div>
                {
                    ((props.itemToDisplay.banners ?? []).length > 0) && (
                        <div className="col-6 pt1 community-search-banner">
                            <LazyLoadImage
                                src={`https://community.nmscd.com${props.itemToDisplay.banners![0]}`}
                                alt={props.itemToDisplay.banners![0]}
                                draggable={false}
                            />
                        </div>
                    )
                }
                <div className="col-6 pt1 ta-left pl2">
                    <b>Description:<br /></b>
                    {props.itemToDisplay.desc ?? ''}
                    {
                        ((props.itemToDisplay.links ?? []).length > 0) && (
                            <>
                                <br />
                                <br />
                                <b>Links:<br /></b>
                                {(props.itemToDisplay.links ?? []).map(renderSingleLink)}
                            </>
                        )
                    }
                    {
                        ((props.itemToDisplay.tags ?? []).length > 0) && (
                            <>
                                <br />
                                <b>Tags:<br /></b>
                                {communitySearchTags(props.chipColours, props.itemToDisplay.tags)}
                            </>
                        )
                    }
                </div>
                <div className="col-12">
                    <br /><br />
                </div>
            </div>
        );
    }

    return (
        <BottomModalSheet
            isOpen={props.isModalOpen}
            onClose={() => props.setModalClosed()}
            snapPoints={[600]}
        >
            <div className="content">
                <div className="container full pt1">
                    {renderContent()}
                </div>
            </div>
        </BottomModalSheet>
    );
}