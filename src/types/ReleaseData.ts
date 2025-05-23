export interface Asset {
  name: string;
  browser_download_url: string;
}

export interface Release {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  assets: Asset[];
  target_commitish: string; 
  draft?: boolean;
  prerelease?: boolean;
}

export interface PlatformRelease {
  tagName: string;
  name: string;
  body: string;
  url: string;
  asset: {
    name: string;
    downloadUrl: string;
  } | null;
}

export interface ReleaseData {
  windows: PlatformRelease | null;
  mac: PlatformRelease | null;
  linuxDeb: PlatformRelease | null;
  linuxRpm: PlatformRelease | null;
  linuxPacman: PlatformRelease | null;
}
