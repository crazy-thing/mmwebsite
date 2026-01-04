import React from 'react';
import '../styles/Button.css';
import Button from './Button';
import windows from '../assets/windows.svg';
import mac from '../assets/apple.svg';
import linux from '../assets/linux.svg';
import '../styles/DownloadButtons.css';
interface DownloadButtonsProps {
  onClick: any;
  windowsInstaller: any;
  macInstaller: any;
};


const DownloadButtons: React.FC<DownloadButtonsProps> = ({ onClick, windowsInstaller, macInstaller  }) => {
  return (
    <div className='download-buttons'>
        <Button onClick={() => window.open(windowsInstaller.downloadUrl)} icon={windows} color='#2A4968' borderColor='#0CF' text='WINDOWS' />
        <Button onClick={() => window.open(macInstaller.downloadUrl)} icon={mac} color='#365626' borderColor='#00FF6F' text='MACOS' />
        <Button onClick={onClick} icon={linux} color='#4D2344' borderColor='#D400FF' text='LINUX' />
    </div>
  )
};

export default DownloadButtons;