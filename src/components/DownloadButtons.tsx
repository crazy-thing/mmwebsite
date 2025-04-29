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

const windowButtonStyle = {
  width: '40vh',
};

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ onClick, windowsInstaller, macInstaller  }) => {
  return (
    <div className='download-buttons'>
        <Button onClick={() => window.open(windowsInstaller.downloadUrl, '_blank')} icon={windows} text='Download for Windows' style={windowButtonStyle}/>
        <div className='download-buttons-bottom'>
            <Button onClick={() => window.open(macInstaller.downloadUrl, '_blank')} icon={mac} text='Download for MacOS' style={null}/>
            <Button onClick={onClick} icon={linux} text='Download for Linux' style={null}/>
        </div>
    </div>
  )
};

export default DownloadButtons;