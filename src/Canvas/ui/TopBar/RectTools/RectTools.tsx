import React from 'react'
import AttributesTools from '../AttributesTools/AttributesTools'

interface RectToolsProps {
  selectedElement: HTMLElement
  svgUpdate: (svgString: string) => void
  onClose?: () => void
  canvas?: any
  canvasUpdated?: boolean
}

const RectTools: React.FC<RectToolsProps> = ({ selectedElement, svgUpdate }) => (
  <AttributesTools
    selectedElement={selectedElement}
    handleChange={svgUpdate}
    attributes={{
      x: 'readOnly',
      y: 'readOnly',
      width: 'readOnly',
      height: 'readOnly',
      stroke: 'readOnly',
      'stroke-width': 'readOnly',
    }}
  />
)

export default RectTools
