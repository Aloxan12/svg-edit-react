import React from 'react';
import AttributesTools from '../AttributesTools/AttributesTools';

interface EllipseToolsProps {
    canvas: any;
    canvasUpdated: boolean;
    selectedElement: HTMLElement;
    svgUpdate: (svgString: string) => void
    onClose: () => void
}

const EllipseTools: React.FC<EllipseToolsProps> = ({ selectedElement, svgUpdate }) => {
    console.log('selectedElement', selectedElement)
    return (
        <AttributesTools
            selectedElement={selectedElement}
            handleChange={svgUpdate}
            attributes={{
                cx: 'readOnly',
                cy: 'readOnly',
                rx: 'readOnly',
                ry: 'readOnly',
            }}
        />
    );
}

export default EllipseTools;