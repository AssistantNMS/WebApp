import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { knownKeyCodes } from '../../../constants/Keybind';
import { NetworkState } from '../../../constants/NetworkState';
import * as Route from '../../../constants/Route';
import { DevDetail } from '../../../contracts/data/devDetail';
import { ResultWithValue } from '../../../contracts/results/ResultWithValue';
import { LocaleKey } from '../../../localization/LocaleKey';
import { translate } from '../../../localization/Translate';
import { DataJsonService } from '../../../services/json/DataJsonService';
import { Error } from '../../core/error/error';
import { Loading } from '../../core/loading/loading';
import { SpotlightSearchResult } from './spotlightSearchResults';
import { EventTargetValue, OnClickEvent, OnKeyDownEvent } from '../../../helper/typescriptHacks';

interface INavProps {}

interface IProps extends INavProps {
  isOpen: boolean;
  dataJsonService: DataJsonService;
  onClose: () => void;
}

export const SpotlightSearch: React.FC<IProps> = (props: IProps) => {
  const navigate = useNavigate();

  const [text, setText] = useState<string | undefined>();
  const [dataLookup, setDataLookup] = useState<Array<DevDetail>>([]);
  const [selectedSearchResult, setSelectedSearchResult] = useState(0);
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Loading);
  let inputRef = useRef<HTMLInputElement | null>(null);

  const variants = {
    initial: { scale: 0, opacity: 0, marginTop: '-50vh' },
    open: { scale: 1, opacity: 1, marginTop: 0 },
    closed: { scale: 0, opacity: 0, marginTop: 0 },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const devResult: ResultWithValue<Array<DevDetail>> = await props.dataJsonService.getDeveloperDetails();
    if (devResult.isSuccess === false) {
      setNetworkState(NetworkState.Error);
      return;
    }
    setDataLookup(devResult.value);
    setNetworkState(NetworkState.Success);
  };

  const getGameId = (devItem: DevDetail) => devItem?.Properties?.find?.((p) => p.Name === 'GameId')?.Value;

  const getSearchResults = (searchText?: string): Array<DevDetail> => {
    const localSearchText = searchText ?? '';
    const searchResults: Array<DevDetail> = [];
    for (const devItem of dataLookup) {
      const gameId = getGameId(devItem);
      if (gameId == null) continue;
      if (localSearchText === '' || localSearchText.includes('*') || gameId.toLocaleLowerCase().includes(localSearchText.toLocaleLowerCase())) {
        searchResults.push(devItem);
      }
    }
    return searchResults;
  };

  const onCloseSpotlight = () => {
    (inputRef as any)?.blur?.();
    setTimeout(() => {
      setText(undefined);
      setSelectedSearchResult(0);
    }, 1000);
    props.onClose?.();
  };

  const setSelectedSearchResultSafely = (newValue: number) => {
    if (newValue < 0) {
      setSelectedSearchResult(0);
      return;
    }

    if (newValue !== 0 && newValue >= searchResults.length) {
      setSelectedSearchResult(searchResults.length - 1);
      return;
    }
    setSelectedSearchResult(newValue);
  };

  const onSpotlightType = (e: OnKeyDownEvent) => {
    if (e?.keyCode === knownKeyCodes.esc) onCloseSpotlight();
    if (e?.keyCode === knownKeyCodes.enter) {
      const openAppFunc = openItem(searchResults[selectedSearchResult]);
      openAppFunc({ preventDefault: undefined, stopPropagation: undefined });
      return;
    }

    if (e?.keyCode === knownKeyCodes.up || e?.keyCode === knownKeyCodes.down) {
      e?.preventDefault?.();
    }
    if (e?.keyCode === knownKeyCodes.up) {
      setSelectedSearchResultSafely(selectedSearchResult - 1); // up
      return;
    }
    if (e?.keyCode === knownKeyCodes.down) {
      setSelectedSearchResultSafely(selectedSearchResult + 1); // down
      return;
    }

    setSelectedSearchResultSafely(0); // set to first item
  };

  const openItem = (devItem: DevDetail) => (e: OnClickEvent) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const gameId = getGameId(devItem);
    if (gameId == null) return;

    onCloseSpotlight();
    navigate(`${Route.catalogueItem}/${gameId}`);
  };

  const onSpotlightTextChange = (e: EventTargetValue) => {
    setText(e?.target?.value ?? text ?? '');
  };

  const onSpotlightGroupClick = (e: any) => {
    if (e?.customEvent === 'spotlightSelect') return;

    (inputRef as any)?.focus?.();
  };

  const onClick = props.isOpen ? onCloseSpotlight : () => {};
  const searchResults: Array<DevDetail> = getSearchResults(text?.toLocaleLowerCase?.());

  return (
    <div className={classNames('spotlight', { isOpen: props.isOpen })} draggable="false">
      <div className={classNames('spotlight-bg', { isOpen: props.isOpen })} onClick={onClick}></div>
      <motion.div
        key="spotlight"
        id="spotlight-wrapper"
        initial={variants.initial}
        transition={{ duration: 0.5 }}
        animate={props.isOpen ?? false ? 'open' : 'initial'}
        variants={variants}
        exit={variants.closed}
        onClick={() => {}}
      >
        <div className="spotlight-group" onClick={onSpotlightGroupClick}>
          <p>GameId {translate(LocaleKey.search)}</p>
          <input
            ref={(input) => {
              input && props.isOpen && input.focus();
              inputRef = input as unknown as React.MutableRefObject<HTMLInputElement | null>;
            }}
            id="spotlight"
            type="text"
            placeholder="Search"
            className="form-control"
            value={text ?? ''}
            onKeyDown={onSpotlightType}
            onChange={onSpotlightTextChange}
          />
          {networkState === NetworkState.Success ? (
            <SpotlightSearchResult
              searchText={text}
              searchResults={searchResults}
              selectedSearchResult={selectedSearchResult}
              setSelectedSearchResult={setSelectedSearchResultSafely}
              openItem={openItem}
            />
          ) : networkState === NetworkState.Loading ? (
            <Loading />
          ) : (
            <Error />
          )}
        </div>
      </motion.div>
    </div>
  );
};
