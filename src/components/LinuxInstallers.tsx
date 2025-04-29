import React from 'react';
import '../styles/Button.css';
import Button from './Button';
import deb from '../assets/debian.svg';
import rpm from '../assets/redhat.svg';
import pacman from '../assets/arch.svg';
import '../styles/LinuxInstallers.css';
interface LinuxInstallerProps {
  linuxDebInstaller: any;
  linuxRpmInstaller: any;
  linuxPacmanInstaller: any;
};

const LinuxInstallers: React.FC<LinuxInstallerProps> = ({ linuxDebInstaller, linuxRpmInstaller, linuxPacmanInstaller  }) => {
  return (
    <div className='linux-installers'>
        <p className='linux-installers-title'>Linux Installers</p>
        <div className='linux-installers-buttons'>
            <Button onClick={() => window.open(linuxDebInstaller.downloadUrl, '_blank')} icon={deb} text='.deb Installer' style={null}/>
            <Button onClick={() => window.open(linuxRpmInstaller.downloadUrl, '_blank')} icon={rpm} text='.rpm Installer' style={null}/>
            <Button onClick={() => window.open(linuxPacmanInstaller.downloadUrl, '_blank')} icon={pacman} text='.pacman Installer' style={null}/>
        </div>
    </div>
  )
};

export default LinuxInstallers;