import React from 'react';
import AttributesTools from '../AttributesTools/AttributesTools';

interface CircleToolsProps {
    canvas?: any;
    canvasUpdated?: boolean;
    selectedElement: HTMLElement;
    svgUpdate?: (svgString: string) => void
    onClose?: () => void
}

const CircleTools: React.FC<CircleToolsProps> = ({ selectedElement }) => (
    <AttributesTools
        selectedElement={selectedElement}
        handleChange={() => {}}
        attributes={{
            cx: 'readOnly',
            cy: 'readOnly',
            r: 'readOnly',
        }}
    />
);

export default CircleTools;
