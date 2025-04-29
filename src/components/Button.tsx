import React from 'react';
import '../styles/Button.css';

interface ButtonProps {
    onClick: () => void;
    icon: any;
    text: string;
    style: any;
};

const Button: React.FC<ButtonProps> = ({ onClick, icon, text, style = null}) => {
  return (
    <div className='button' onClick={onClick} style={style ? style : null}>
        <img className='button-icon' src={icon} />
        <p className='button-text'>{text}</p>   
    </div>
  )
};

export default Button;