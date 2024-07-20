import { ControllerPlatformType } from '../../../contracts/enum/ControllerPlatformType';
import * as type from './type';

export const setLanguage = (langCode: string) => {
  return {
    langCode,
    type: type.LANGUAGE,
  };
};

export const toggleMenu = () => {
  return {
    type: type.TOGGLEMENU,
  };
};

export const setPlatform = (platform: ControllerPlatformType) => {
  return {
    platform,
    type: type.SETPLATFORM,
  };
};

export const toggleAltGlyphs = () => {
  return {
    type: type.TOGGLEALTGLYPHS,
  };
};

export const setFont = (font: string) => {
  return {
    font,
    type: type.SETFONT,
  };
};

export const setPlayerName = (playerName: string) => {
  return {
    playerName,
    type: type.SETPLAYERNAME,
  };
};

export const hideMobile = () => {
  return {
    type: type.HIDEMOBILE,
  };
};
