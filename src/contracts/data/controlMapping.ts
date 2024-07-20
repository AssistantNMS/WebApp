export interface ControlMappingList {
  Win: Array<PlatformControlMapping>;
  Psn: Array<PlatformControlMapping>;
  Xbx: Array<PlatformControlMapping>;
  Nsw: Array<PlatformControlMapping>;
}

export interface PlatformControlMapping {
  Key: string;
  Icon: string;
}
