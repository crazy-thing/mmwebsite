import semver from 'semver';
import { Release, ReleaseData, PlatformRelease } from '../types/ReleaseData';

export async function fetchAllReleases(owner: string, repo: string): Promise<ReleaseData> {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases`;

  try {
    const response = await fetch(url);
    const data: Release[] = await response.json(); // Cast the response to Release[]

    // Initialize variables to store the latest release for each platform
    let latestWindowsRelease: PlatformRelease | null = null;
    let latestMacRelease: PlatformRelease | null = null;
    let latestLinuxDebRelease: PlatformRelease | null = null;
    let latestLinuxRpmRelease: PlatformRelease | null = null;
    let latestLinuxPacmanRelease: PlatformRelease | null = null;

    // Loop through all releases and filter the latest for each platform
    data.forEach(release => {
      // Filter: only published releases from the 'main' branch with valid semver
      if (
        release.draft ||
        release.prerelease ||
        release.target_commitish !== 'main' ||
        !semver.valid(release.tag_name)
      ) {
        return;
      }

      const assets = release.assets ?? [];

      // Windows
      if (!latestWindowsRelease || semver.gt(release.tag_name, latestWindowsRelease.tagName)) {
        const windowsAsset = assets.find(asset => asset.name.endsWith('.exe'));
        if (windowsAsset) {
          latestWindowsRelease = {
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            url: release.html_url,
            asset: {
              name: windowsAsset.name,
              downloadUrl: windowsAsset.browser_download_url
            }
          };
        }
      }

      // macOS
      if (!latestMacRelease || semver.gt(release.tag_name, latestMacRelease.tagName)) {
        const macAsset = assets.find(asset => asset.name.endsWith('.dmg'));
        if (macAsset) {
          latestMacRelease = {
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            url: release.html_url,
            asset: {
              name: macAsset.name,
              downloadUrl: macAsset.browser_download_url
            }
          };
        }
      }

      // Linux DEB
      if (!latestLinuxDebRelease || semver.gt(release.tag_name, latestLinuxDebRelease.tagName)) {
        const linuxDebAsset = assets.find(asset => asset.name.endsWith('.deb'));
        if (linuxDebAsset) {
          latestLinuxDebRelease = {
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            url: release.html_url,
            asset: {
              name: linuxDebAsset.name,
              downloadUrl: linuxDebAsset.browser_download_url
            }
          };
        }
      }

      // Linux RPM
      if (!latestLinuxRpmRelease || semver.gt(release.tag_name, latestLinuxRpmRelease.tagName)) {
        const linuxRpmAsset = assets.find(asset => asset.name.endsWith('.rpm'));
        if (linuxRpmAsset) {
          latestLinuxRpmRelease = {
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            url: release.html_url,
            asset: {
              name: linuxRpmAsset.name,
              downloadUrl: linuxRpmAsset.browser_download_url
            }
          };
        }
      }

      // Linux Pacman
      if (!latestLinuxPacmanRelease || semver.gt(release.tag_name, latestLinuxPacmanRelease.tagName)) {
        const linuxPacmanAsset = assets.find(asset => asset.name.endsWith('.pacman'));
        if (linuxPacmanAsset) {
          latestLinuxPacmanRelease = {
            tagName: release.tag_name,
            name: release.name,
            body: release.body,
            url: release.html_url,
            asset: {
              name: linuxPacmanAsset.name,
              downloadUrl: linuxPacmanAsset.browser_download_url
            }
          };
        }
      }
    });

    // Return the latest releases for each platform
    return {
      windows: latestWindowsRelease,
      mac: latestMacRelease,
      linuxDeb: latestLinuxDebRelease,
      linuxRpm: latestLinuxRpmRelease,
      linuxPacman: latestLinuxPacmanRelease
    };
  } catch (error) {
    throw new Error('Error fetching releases: ' + error);
  }
}
