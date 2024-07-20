export const anyObject: any = {};

export type OnClickEvent = {
  preventDefault: undefined | (() => void);
  stopPropagation: undefined | (() => void);
};
export type OnKeyDownEvent = OnClickEvent & {
  keyCode: number;
};

export type EventTargetValue = {
  target?: {
    value?: string;
  };
};
