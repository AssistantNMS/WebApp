import React, { ReactNode } from 'react';
import { AppImage } from '../../constants/AppImage';
import { PlatformControlMapping } from '../../contracts/data/controlMapping';
import { CustomTooltip } from './tooltip/tooltip';

interface IProps {
    orig: string;
    controlLookup?: Array<PlatformControlMapping>;
}

const paleYellowColourClass = '#C9D68B';
const goldColourClass = '#B09857';
const darkRedColourClass = '#AE615E';
const paleBlueColourClass = '#83BCDB';
const greenColourClass = '#AADE9B';
const purpleColourClass = '#B0A5DD';
const offWhiteColourClass = '#F5F5F5';
const orangeColourClass = '#F3A923';
const redColourClass = '#C03022';

const getColourValueFromTag = (tag: string) => {

    switch (tag.toUpperCase()) {
        case 'IMG': return 'replace-with-img';

        case 'EARTH':
        case 'TITLE':
        case 'TRANS_EXP':
        case 'TEMPERATURE':
        case 'TECHNOLOGY':
        case 'TECHNOLOLY': return paleBlueColourClass;

        case 'TRANS_TRA':
        case 'TRADEABLE': return greenColourClass;

        case 'TRANS_WAR':
        case 'WARNING': return darkRedColourClass;

        case 'FUEL': return redColourClass;
        case 'STELLAR': return paleYellowColourClass;
        case 'COMMODITY': return goldColourClass;
        case 'SPECIAL': return purpleColourClass;
        case 'VAL_ON': return offWhiteColourClass;
        case 'CATALYST': return orangeColourClass;
    }

    console.warn('unknown tag', tag);
    return '';
}

export const DecriptionRegexHighlightText: React.FC<IProps> = (props: IProps) => {
    const doubleTagRegex = new RegExp(/<\w+>(<\w+>(\w+\s*)*<>)<>/);
    const tagStartRegex = new RegExp(/(.*)<(\w+)>(.*)/);
    const tagEndRegex = new RegExp(/(.*)<>(.*)/);

    let currentColourValue = '';
    let paragraphNodes: Array<ReactNode> = [];
    let groupMatches = props.orig.includes('<>');
    if (!groupMatches) return (<>{props.orig}</>);

    const renderNode = (paragraphIndex: number, wordIndex: number, word: string, colour: string, wordChain: string) => (
        <span key={`paragraph-${paragraphIndex}-word-${wordIndex}-${word}`} style={{ color: colour }}>{wordChain}</span>
    );

    const paragraphs = props.orig.split(/\r?\n/);
    for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex++) {
        const paragraph = paragraphs[paragraphIndex];
        if (paragraph.length < 2) continue;

        let nodes: Array<ReactNode> = [];
        let wordChain = '';
        const words = paragraph.split(' ');
        for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            let word = words[wordIndex];
            let displayWord = word;
            let localTag = '<unused>';
            let leftOverDisplayWordFront = '';
            let leftOverDisplayWord = '';

            let doubleMatches: Array<any> | null = doubleTagRegex.exec(word)
            if (doubleMatches != null && doubleMatches.length > 0) {
                console.log(doubleMatches);
                word = doubleMatches[1];
            }

            let startMatches: Array<any> | null = tagStartRegex.exec(word);
            if (startMatches != null && startMatches.length === 4) {
                leftOverDisplayWordFront = startMatches[1];
                displayWord = startMatches[3];
                localTag = '<' + startMatches[2] + '>';
                currentColourValue = getColourValueFromTag(startMatches[2]);
            }

            let endMatches: Array<any> | null = tagEndRegex.exec(word);
            let hasEndMatch = endMatches != null && endMatches.length >= 2;
            if (hasEndMatch) {
                displayWord = (endMatches?.[1] ?? '').replace(localTag, '');
            }
            if (endMatches != null && endMatches.length === 3) {
                leftOverDisplayWord = endMatches![2] + ' ';
            }

            if (currentColourValue.length > 1) {
                if (wordChain.length > 1) {
                    nodes.push(renderNode(paragraphIndex, wordIndex, word, '', wordChain));
                }
                if (leftOverDisplayWordFront.length > 0) {
                    nodes.push(renderNode(paragraphIndex, wordIndex + 9999, leftOverDisplayWordFront, '', leftOverDisplayWordFront));
                }
                if (localTag === '<IMG>') {
                    const lookupKey = (displayWord ?? '').replaceAll('(', '').replaceAll(')', '');
                    let lookupResult = props.controlLookup?.filter?.(cl => cl.Key === lookupKey);
                    if (lookupResult == null || lookupResult.length < 1) {
                        lookupResult = props.controlLookup?.filter?.(cl => cl.Key.includes(lookupKey));
                    }
                    let lookupResKey = 'Unknown';
                    let lookupResIcon = AppImage.unknownButton;
                    if (lookupResult != null && lookupResult.length > 0) {
                        lookupResKey = lookupResult[0].Key;
                        lookupResIcon = lookupResult[0].Icon;
                    }
                    nodes.push(
                        <CustomTooltip
                            key={`paragraph-${paragraphIndex}-word-${wordIndex}-${word}-${lookupResKey}`}
                            tooltipText="Not the right platform? Change your platform at the top of the page or in the settings page!" theme="transparent"
                        >
                            <img
                                className="descrip-img"
                                src={`/${AppImage.controls}${lookupResIcon}`}
                                alt={lookupResKey}
                            />
                        </CustomTooltip>
                    );
                } else {
                    nodes.push(renderNode(paragraphIndex, wordIndex + 999, displayWord, currentColourValue, displayWord + ((leftOverDisplayWord.length > 0) ? '' : ' ')));
                }
                if (leftOverDisplayWord.length > 0) {
                    nodes.push(renderNode(paragraphIndex, wordIndex + 9999, leftOverDisplayWord, '', leftOverDisplayWord));
                }
                wordChain = '';
            } else {
                wordChain += displayWord + ' ';
            }


            if (hasEndMatch) {
                currentColourValue = '';
            }
        }

        if (wordChain.length > 1) {
            nodes.push(renderNode(paragraphIndex, 999, wordChain.length.toString(), '', wordChain));
        }

        paragraphNodes.push(
            <div key={`paragraph-${paragraphIndex}`} className="pb1">
                {nodes}
            </div>
        );
    }

    return (
        <span className="highlight-text">
            {paragraphNodes}
        </span>
    );
}
