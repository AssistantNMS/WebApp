export interface AssistantAppLinks {
  guid: string;
  type: string;
  name: string;
  gameName: string;
  iconUrl: string;
  logoUrl: string;
  links: Array<AssistantAppLinkItem>;
  isVisible: boolean;
  sortOrder: number;
}

export interface AssistantAppLinkItem {
  type: string;
  url: string;
}
