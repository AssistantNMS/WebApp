import { AppImage } from '../../constants/AppImage';
import { ExpeditionSeason, ExpeditionSeasonDetailsFromId } from '../../contracts/helloGames/expeditionSeason';

export const detailsFromExpeditionId = (jsonExp: ExpeditionSeason): ExpeditionSeasonDetailsFromId => {
  const seasIdRegex = new RegExp(/^(seas-){1}(\d+)(-redux)?(\d+)?/);
  const seasIdRegexArr = seasIdRegex.exec(jsonExp.Id);

  const result: ExpeditionSeasonDetailsFromId = {
    id: '',
    background: AppImage.expeditionSeasonBackgroundBackup,
    isRedux: false,
    reduxNum: 0,
    reduxSuffix: '',
  };

  if (seasIdRegexArr === null) return result;
  if (seasIdRegexArr.length < 2) return result;

  if (seasIdRegexArr.length >= 2) {
    const seasIdGrp2 = seasIdRegexArr[2];
    if (seasIdGrp2 != null) {
      result.id = seasIdGrp2;
    }
  }

  if (seasIdRegexArr.length >= 3) {
    result.isRedux = true;
  }

  if (seasIdRegexArr.length === 4) {
    const reduxNum = seasIdRegexArr[4];
    if (reduxNum != null) {
      result.reduxNum = parseInt(reduxNum) ?? 0;
    }
  }

  if (result.isRedux) {
    result.reduxSuffix = ' (Redux)';

    if (result.reduxNum > 1) {
      result.reduxSuffix = ` (Redux #${result.reduxNum})`;
    }
  }

  result.background = `${AppImage.expeditionSeasonBackgroundPrefix}seas-${result.id}.jpg`;

  return result;
};
