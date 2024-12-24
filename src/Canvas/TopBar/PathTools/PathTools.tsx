import React from "react";
import AttributesTools from "../AttributesTools/AttributesTools";

interface PathToolsProps {
    canvas?: any;
    canvasUpdated?: boolean;
    selectedElement: HTMLElement;
    svgUpdate?: (svgString: string) => void
    onClose?: () => void
}

const PathTools: React.FC<PathToolsProps> = ({ selectedElement }) => (
    <AttributesTools
        selectedElement={selectedElement}
        handleChange={() => {}}
        attributes={{ d: 'readOnly' }}
    />
);

export default PathTools;
