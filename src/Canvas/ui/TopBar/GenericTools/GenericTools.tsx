import React, { useEffect, useState } from 'react'
import SvgCanvas from '@svgedit/svgcanvas'
import IconButton from '../../IconButton/IconButton'

interface GenericToolsProps {
  canvas?: SvgCanvas | null
  svgUpdate: (svgString: string) => void
  canvasUpdated: boolean
  onClose: () => void
  selectedElement: HTMLElement | null | undefined
}

const GenericTools: React.FC<GenericToolsProps> = ({
  canvas,
  canvasUpdated,
  svgUpdate,
  onClose,
}) => {
  const [xmlData, setXmlData] = useState<string | null>(null)

  const onClickUndo = () => {
    canvas?.undoMgr.undo()
    // populateLayers()
  }

  const onClickRedo = () => {
    canvas?.undoMgr.redo()
    // populateLayers()
  }

  const svgSaveFile = () => {
    const svgElement = document.querySelector('#svgroot')
    if (!svgElement) {
      console.error('SVG element not found!')
      return
    }
    canvas?.clearSelection()

    const backgroundElement = svgElement.querySelector('#canvasBackground')
    if (backgroundElement) {
      backgroundElement.parentNode?.removeChild(backgroundElement)
    }

    const svgContent = svgElement.outerHTML

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })

    // Создать временную ссылку для скачивания
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'image.svg'
    document.body.appendChild(link)

    // Инициировать скачивание
    link.click()

    // Удалить временную ссылку
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    onClose()
  }

  useEffect(() => {
    const fetchXml = async () => {
      // Путь будет работать, если файл находится в public
      const response = await fetch('/svg-edit-react/humberger.svg')
      const text = await response.text()
      setXmlData(text)
    }
    fetchXml().catch((err) => console.log(err))
  }, [])

  const onUploadSvg = () => {
    const svgString = xmlData || ''
    const svgElement = new DOMParser().parseFromString(svgString, 'image/svg+xml').documentElement

    // Получаем текущее содержимое SVG
    const existingSvgContent = canvas?.getSvgContent().children[0]

    if (!existingSvgContent) {
      console.error('No existing SVG content')
      return
    }

    // Извлекаем все элементы из нового SVG
    const newElements = svgElement.childNodes

    // Добавляем каждый элемент в существующий SVG
    Array.from(newElements).forEach((newElement) => {
      existingSvgContent.appendChild(newElement)
    })

    // Обновляем канвас с новым содержимым
    canvas?.setSvgString(existingSvgContent.outerHTML)
  }

  return (
    <>
      <IconButton icon="Close" onClick={onUploadSvg} />
      <IconButton icon="Save" onClick={svgSaveFile} />
      <IconButton
        icon="Save"
        className={canvasUpdated ? 'enabled' : 'disabled'}
        onClick={() => {
          if (canvas) {
            svgUpdate(canvas.getSvgString())
          }
        }}
      />
      <IconButton icon="Undo" onClick={onClickUndo} />
      <IconButton icon="Redo" onClick={onClickRedo} />
    </>
  )
}

export default GenericTools
