import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
    onClick: () => void;
    icon: any;
    text: string;
    color: string;
    borderColor?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, icon, text, color, borderColor }) => {
  return (
    <div className='button' onClick={onClick} style={{ backgroundColor: color, borderColor: borderColor }}>
        <img className='button-icon' src={icon} />
        <p className='button-text'>{text}</p>   
    </div>
  )
};

export default Button;