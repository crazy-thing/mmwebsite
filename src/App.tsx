import { useEffect, useState } from 'react';
import './App.css';
import logo from './assets/mm_logo.svg';
import DownloadButtons from './components/DownloadButtons';
import LinuxInstallers from './components/LinuxInstallers';
import { fetchAllReleases } from './util/downloader';
import { Installer } from './types/Installer';
import ScreenshotViewer from './components/ScreenshotViewer';

function App() {
  const [showInstallers, setShowInstallers] = useState(false);

  const [windowsInstaller, setWindowsInstaller] = useState<Installer | null>(null);
  const [macInstaller, setMacInstaller] = useState<Installer | null>(null);
  const [linuxDebInstaller, setLinuxDebInstaller] = useState<Installer | null>(null);
  const [linuxRpmInstaller, setLinuxRpmInstaller] = useState<Installer | null>(null);
  const [linuxPacmanInstaller, setLinuxPacmanInstaller] = useState<Installer | null>(null);

  useEffect(() => {
    fetchAllReleases("crazy-thing", "mml").then(releases => {
      setWindowsInstaller(releases.windows ? releases.windows.asset : null);
      setMacInstaller(releases.mac ? releases.mac.asset : null);
      setLinuxDebInstaller(releases.linuxDeb ? releases.linuxDeb.asset : null);
      setLinuxRpmInstaller(releases.linuxRpm ? releases.linuxRpm.asset : null);
      setLinuxPacmanInstaller(releases.linuxPacman ? releases.linuxPacman.asset : null);
    });
  }, []);

  return (
    <div className='app'>
      <div className='app-background'></div>
      <div className='app-logo-wrapper'>
        <img 
          src={logo} 
          alt='logo' 
          className='app-logo' 
          onClick={() => setShowInstallers(false)} 
        />
      </div>


      <div className='app__bottom'>
        {showInstallers ? (
          <LinuxInstallers 
            linuxDebInstaller={linuxDebInstaller} 
            linuxRpmInstaller={linuxRpmInstaller} 
            linuxPacmanInstaller={linuxPacmanInstaller} 
          />
        ) : (
          <DownloadButtons 
            onClick={() => setShowInstallers(true)} 
            windowsInstaller={windowsInstaller} 
            macInstaller={macInstaller} 
          />
        )}
        <div className='app__bottom-info'>
          <ScreenshotViewer
            apiUrl="https://minecraftmigos.tech/example/v1/screenshots"
            uploadsUrl='https://minecraftmigos.tech/uploads/screenshots'
            intervalMs={5000}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
