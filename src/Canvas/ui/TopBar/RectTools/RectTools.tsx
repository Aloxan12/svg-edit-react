import React from 'react'
import AttributesTools from '../AttributesTools/AttributesTools'

interface RectToolsProps {
    canvas?: any;
    canvasUpdated?: boolean;
    selectedElement: HTMLElement;
    svgUpdate: (svgString: string) => void
    onClose?: () => void
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
