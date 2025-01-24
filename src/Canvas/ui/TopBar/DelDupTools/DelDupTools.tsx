import React from 'react'
import SvgCanvas from '@svgedit/svgcanvas'
import IconButton from '../../IconButton/IconButton'

interface DelDupToolsProps {
  canvas?: SvgCanvas
  selectedElement: HTMLElement | null | undefined
}

const DelDupTools: React.FC<DelDupToolsProps> = ({ canvas, selectedElement }) => {
  const cloneSelectedElementsHandler = () => canvas?.cloneSelectedElements(20, 20)
  const convertPathHandler = () => {
    console.log('canvas', canvas)
    if (selectedElement) {
      canvas?.convertToPath(selectedElement)
    }
  }
  const isPath = selectedElement?.id.includes('path') || selectedElement?.tagName === 'path'
  return (
    <>
      <IconButton icon="Delete" onClick={canvas?.deleteSelectedElements} />
      <IconButton icon="Copy" onClick={cloneSelectedElementsHandler} />
      {!isPath && <IconButton icon="convertPath" onClick={convertPathHandler} />}
    </>
  )
}

export default DelDupTools
