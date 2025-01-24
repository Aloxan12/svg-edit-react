import React from 'react'
import Icon from '../Icon/Icon'
import cls from './IconButton.module.scss'

interface IconButtonProps {
  onClick?: () => void
  className?: string
  icon: string
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, className = 'button', icon }) => (
  <button type="button" className={className} onClick={onClick}>
    <Icon name={icon} className={cls.toolsIcon} />
    <br />
    {icon}
  </button>
)

export default IconButton
