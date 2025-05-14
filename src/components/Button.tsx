import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
    onClick: () => void;
    icon: any;
    text: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, icon, text}) => {
  return (
    <div className='button' onClick={onClick}>
        <img className='button-icon' src={icon} />
        <p className='button-text'>{text}</p>   
    </div>
  )
};

export default Button;