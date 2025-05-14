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
        <Button onClick={() => window.open(windowsInstaller.downloadUrl, '_blank')} icon={windows} text='Download for Windows' />
        <Button onClick={() => window.open(macInstaller.downloadUrl, '_blank')} icon={mac} text='Download for MacOS' />
        <Button onClick={onClick} icon={linux} text='Download for Linux' />
    </div>
  )
};

export default DownloadButtons;