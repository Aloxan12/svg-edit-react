import React, { useContext } from 'react'
import cls from './BottomBar.module.scss'
import ColorButton from '../ColorButton/ColorButton'
import Icon from '../Icon/Icon'

import { canvasContext } from '../../context/canvasContext'

const zoomOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

// Типы для компонента BottomBar
const BottomBar: React.FC = () => {
  const [canvasState, canvasStateDispatcher] = useContext(canvasContext)
  const {
    layerName, mode, zoom, selectedElement, context,
  } = canvasState

  // Обработчики изменения цвета
  const onChangeFillColor = (color: string) => {
    canvasStateDispatcher({ type: 'color', colorType: 'fill', color })
  }

  const onChangeStrokeColor = (color: string) => {
    canvasStateDispatcher({ type: 'color', colorType: 'stroke', color })
  }

  // Цвета выбранного элемента
  const selectedFillColor = selectedElement?.getAttribute('fill') || ''
  const selectedStrokeColor = selectedElement?.getAttribute('stroke') || ''
  // Обработчик изменения зума
  const handleZoom = (newZoom: string) => {
    canvasStateDispatcher({ type: 'zoom', zoom: Number(newZoom) })
  }
  console.log('selectedFillColor', selectedFillColor)
  // Построение полного контекста
  let fullContext = ''
  if (context) {
    let currentChild = context
    do {
      fullContext = `${currentChild.id ?? ''} ${fullContext}`
      currentChild = currentChild.parentNode as HTMLElement
    } while (currentChild?.id === 'svgcontent')
  }
  return (
    <div className={cls.bottomBar}>
      <ColorButton onChange={onChangeFillColor} value={selectedFillColor} title="Fill" />
      <ColorButton onChange={onChangeStrokeColor} value={selectedStrokeColor} title="Stroke" />
      <label>
        <Icon name="Zoom" className={cls.zoom} />
        <select value={zoom} onChange={(e) => handleZoom(e.target.value)}>
          {zoomOptions.map((o) => (
            <option key={o} value={o}>
              {`${o}%`}
            </option>
          ))}
        </select>
      </label>
      <div className={cls.mode}>{`Mode: ${mode}`}</div>
      <div className={cls.layer}>{`Layer: ${layerName}`}</div>
      <div className={cls.context}>{`Context: ${fullContext}`}</div>
    </div>
  )
}

export default BottomBar
