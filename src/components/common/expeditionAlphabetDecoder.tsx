import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ExternalUrls } from '../../constants/ExternalUrls';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { DataJsonService } from '../../services/json/DataJsonService';
import { CustomTooltip } from './tooltip/tooltip';

interface IWithDepInj {
  dataJsonService: DataJsonService;
}
interface IWithoutDepInj {
  id: string;
}

interface IProps extends IWithDepInj, IWithoutDepInj {}

const ExpeditionAlphabetDecoderUnconnected: React.FC<IProps> = (props: IProps) => {
  const [counter, setCounter] = useState<number>(0);
  const [translation, setTranslation] = useState<string>();

  useEffect(() => {
    if (props?.id == null) return;
    if (translation == null) {
      getTranslationText(props.id);
    }

    const timer = setTimeout(() => {
      setCounter(counter + 1);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
     
  }, [counter, translation]);

  const getTranslationText = async (appId: string) => {
    const allTranslations = await props.dataJsonService.getAlphabetTranslations();
    for (const trans of allTranslations.value) {
      if (trans.AppId === appId) {
        setTranslation(trans.Text);
        break;
      }
    }
  };

  const getRandomClass = () => {
    const randomPerc = Math.random() * 100;
    return randomPerc > 10 ? 'exp-font' : '';
  };

  if (translation == null) return null; // TODO translate
  return (
    <CustomTooltip tooltipText="Open in Expedition Alphabet website" theme="light">
      <a
        href={ExternalUrls.expeditionAlphabetDisplay + translation}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames('exp-alpha white chip mb1 pointer noselect')}
      >
        {translation.split('').map((text: string, index: number) => {
          return (
            <span key={`${text}-${index}`} className={classNames('char', getRandomClass())}>
              {text}
            </span>
          );
        })}
      </a>
    </CustomTooltip>
  );
};

export const ExpeditionAlphabetDecoder = withServices<IWithoutDepInj, IWithDepInj>(
  ExpeditionAlphabetDecoderUnconnected,
  (services: IDependencyInjection) => ({
    dataJsonService: services.dataJsonService,
  }),
);
