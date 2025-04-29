import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/MML_Title.png';
import DownloadButtons from './components/DownloadButtons';
import LinuxInstallers from './components/LinuxInstallers';
import { fetchAllReleases } from './util/downloader';

function App() {
  const [showInstallers, setShowInstallers] = useState(false);
  const [windowsInstaller, setWindowsInstaller] = useState(null);
  const [macInstaller, setMacInstaller] = useState(null);
  const [linuxDebInstaller, setLinuxDebInstaller] = useState(null);
  const [linuxRpmInstaller, setLinuxRpmInstaller] = useState(null);
  const [linuxPacmanInstaller, setLinuxPacmanInstaller] = useState(null);

  useEffect(() => {
    fetchAllReleases("crazy-thing", "mml").then(releases => {
      if (releases.length > 0) {
        const latestRelease = releases[0];
        setWindowsInstaller(latestRelease.assets.windows);
        setMacInstaller(latestRelease.assets.mac);
        setLinuxDebInstaller(latestRelease.assets.linuxDeb);
        setLinuxRpmInstaller(latestRelease.assets.linuxRpm);
        setLinuxPacmanInstaller(latestRelease.assets.linuxPacman);
      }
    });
  }, []);

  return (
    <div className='app'>
      <div className='app-background' />
      <img src={logo} alt='logo' className='app-logo' onClick={() => setShowInstallers(false)} />

      {showInstallers ? (
        <LinuxInstallers linuxDebInstaller={linuxDebInstaller} linuxRpmInstaller={linuxRpmInstaller} linuxPacmanInstaller={linuxPacmanInstaller} />
      ) : (
        <DownloadButtons onClick={() => setShowInstallers(true)} windowsInstaller={windowsInstaller} macInstaller={macInstaller} />
      )}
    </div>
  )
}

export default App
