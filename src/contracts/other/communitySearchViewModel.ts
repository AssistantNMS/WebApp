export interface CommunitySearchViewModel {
  id: string;
  name: string;
  icon: string;
  banners?: Array<string>;
  desc?: string;
  tags: Array<string>;
  links: Array<string>;
  customId?: string;
}
