import React, { useEffect, useState } from 'react';
import { translate } from '../../localization/Translate';
import { useParams } from 'react-router-dom';
import { NetworkState } from '../../constants/NetworkState';
import { GuideMetaViewModel } from '../../contracts/generated/guideMetaViewModel';
import { Guide } from '../../contracts/guide/guide';
import { errorDialog, successDialog } from '../../helper/dialogHelper';
import { IDependencyInjection, withServices } from '../../integration/dependencyInjection';
import { LocaleKey } from '../../localization/LocaleKey';
import { ApiService } from '../../services/api/ApiService';
import { GuideService } from '../../services/json/GuideService';
import { GuideDetailPagePresenter } from './guideDetailPagePresenter';

interface IWithDepInj {
  guideService: GuideService;
  apiService: ApiService;
}
interface IWithoutDepInj {}

interface IProps extends IWithDepInj, IWithoutDepInj {}

export const GuideDetailPageContainerUnconnected: React.FC<IProps> = (props: IProps) => {
  const { guid } = useParams();
  const [guide, setGuide] = useState<Guide>();
  const [guideMeta, setGuideMeta] = useState<GuideMetaViewModel>();
  const [status, setStatus] = useState<NetworkState>(NetworkState.Loading);

  useEffect(() => {
    if (guid == null) return;
    fetchData(guid);
    fetchMetaData(guid);
  }, [guid]);

  const fetchData = async (guideGuid: string) => {
    const guideResult = await props.guideService.getSpecificGuide(guideGuid);
    if (!guideResult.isSuccess) {
      setStatus(NetworkState.Error);
      return;
    }
    setGuide(guideResult.value);
    setStatus(NetworkState.Success);
  };

  const fetchMetaData = async (guideGuid: string) => {
    const guideMetaResult = await props.apiService.getGuideMetaData(guideGuid);
    if (!guideMetaResult.isSuccess) return;
    setGuideMeta(guideMetaResult.value);
  };

  const likeGuide = async () => {
    const guid = guide?.guid;
    if (!guid) return;
    const likeResult = await props.apiService.likeGuide(guid);
    if (likeResult.isSuccess && guideMeta != null) {
      successDialog('👍', '');
      const newGuideMeta = { ...guideMeta };
      newGuideMeta.likes = (guideMeta?.likes ?? 0) + 1;
      setGuideMeta(newGuideMeta);
    } else {
      errorDialog(translate(LocaleKey.error), "Your 'like' was not submitted");
    }
  };

  return <GuideDetailPagePresenter {...props} guide={guide} guideMeta={guideMeta} status={status} likeGuide={likeGuide} />;
};

export const GuideDetailPageContainer = withServices<IWithoutDepInj, IWithDepInj>(
  GuideDetailPageContainerUnconnected,
  (services: IDependencyInjection) => ({
    guideService: services.guideService,
    apiService: services.apiService,
  }),
);
