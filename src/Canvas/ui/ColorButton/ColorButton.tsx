import React, { useRef, useState } from 'react'
import { RgbStringColorPicker } from 'react-colorful'
import Icon from '../Icon/Icon'
import cls from './ColorButton.module.scss'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

// Типы пропсов для компонента ColorButton
interface ColorButtonProps {
  onChange: (color: string) => void
  value?: string
  title?: string
}

const ColorButton: React.FC<ColorButtonProps> = ({ onChange, value = '', title = '' }) => {
  const [display, setDisplay] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const handleClick = () => setDisplay(!display)
  const closeHandleClick = () => setDisplay(false)

  const onChangeComplete = (color: string) => {
    onChange(color)
  }

  useOutsideClick(ref, closeHandleClick, display)

  return (
    <div ref={ref} className={cls.colorPanelWrap}>
      {display && (
        <div className={cls.toolsColorPanel}>
          <RgbStringColorPicker color={value} onChange={onChangeComplete} />
        </div>
      )}
      <Icon name={title} className={cls.toolsColorTitle} />
      <div
        className={cls.toolsColorSample}
        onClick={handleClick}
        style={{ backgroundColor: value || '#000000' }}
      />
    </div>
  )
}

export default ColorButton
