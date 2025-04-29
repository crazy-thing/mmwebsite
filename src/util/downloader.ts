export async function fetchAllReleases(owner: string, repo: string) {
  const url = `https://api.github.com/repos/${owner}/${repo}/releases`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.map((release: { id: any; tag_name: any; name: any; body: any; html_url: any; assets: any[]; }) => ({
      id: release.id,
      tagName: release.tag_name,
      name: release.name,
      body: release.body,
      url: release.html_url,
      assets: {
        windows: release.assets
          .filter(asset => asset.name.endsWith('.exe'))
          .map(asset => ({
            name: asset.name,
            downloadUrl: asset.browser_download_url
          }))[0],
        mac: release.assets
          .filter(asset => asset.name.endsWith('.dmg'))
          .map(asset => ({
            name: asset.name,
            downloadUrl: asset.browser_download_url
          }))[0],
        linuxDeb: release.assets
          .filter(asset => asset.name.endsWith('.deb'))
          .map(asset => ({
            name: asset.name,
            downloadUrl: asset.browser_download_url
          }))[0],
        linuxRpm: release.assets
        .filter(asset => asset.name.endsWith('.rpm'))
        .map(asset => ({
          name: asset.name,
          downloadUrl: asset.browser_download_url
        }))[0],
        linuxPacman: release.assets
        .filter(asset => asset.name.endsWith('.pacman'))
        .map(asset => ({
          name: asset.name,
          downloadUrl: asset.browser_download_url
        }))[0]
      }
    }));
  } catch (error) {
    throw new Error('Error fetching releases: ' + error);
  }
}
