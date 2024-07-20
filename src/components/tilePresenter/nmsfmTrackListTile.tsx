import * as React from 'react';
import classNames from 'classnames';

import { TextContainer } from '../common/tile/textContainer';
import { ActionContainer } from '../common/tile/actionContainer';
import { NmsfmTrackType } from '../../contracts/generated/Enum/nmsfmTrackType';
import { NmsfmTrackDataViewModel } from '../../contracts/generated/Model/nmsfmTrackDataViewModel';

export const NmsfmTrackListTile = (props: NmsfmTrackDataViewModel) => {
  const multiline = props.artist == null || props.artist.length === 0;
  return (
    <div className="gen-item-container h-full w-full" draggable={false}>
      <div className="gen-item-content-container pr-6">
        <TextContainer text={props.title} additionalCss={classNames('m-0-child', 'f-1', { multiline })} />
        {props.artist && <div className="quantity-container mb-2">{props.artist}</div>}
        {/* <ActionContainer
                    additionalClass="align-bottom"
                    actions={[
                        <span key="track-time" className="mr-2 mb-2">
                            {getTrackTime(props.runtimeInSeconds)}
                        </span>,
                    ]}
                />
                {
                    props.type != NmsfmTrackType.unknown &&
                    <ActionContainer
                        additionalClass="align-top"
                        actions={[
                            <i key="trackType" className="material-icons x2 mt-1 mr-1">{getTrackIcon(props.type)}</i>
                        ]}
                    />
                } */}

        <ActionContainer
          actions={[
            <span key="track-time" className="mr-3">
              {getTrackTime(props.runtimeInSeconds)}
            </span>,
          ]}
        />
      </div>
    </div>
  );
};

export const getTrackTime = (seconds: number) => {
  if (seconds == null || seconds === 0) return '';

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  if (min === 0 && sec === 0) return '';
  if (min === 0) return `${sec}s`;

  if (sec === 0) return `${min}m`;
  return `${min}m ${sec}s`;
};

export const getTrackIcon = (trackType: NmsfmTrackType): string => {
  switch (trackType) {
    case NmsfmTrackType.track:
      return 'library_music';
    case NmsfmTrackType.advert:
      return 'campaign';
    case NmsfmTrackType.jingle:
      return 'audiotrack';
    case NmsfmTrackType.radioShow:
      return 'mic';
  }
  return '';
};
