import React from 'react';
import Icon from '../Icon/Icon';
import './IconButton.less';

interface IconButtonProps {
    onClick: () => void;
    className?: string;
    icon: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, className = 'button', icon }) => (
    <button type="button" className={className} onClick={onClick}>
        <Icon name={icon} className="OIe-tools-icon" />
        <br />
        {icon}
    </button>
);

export default IconButton;
