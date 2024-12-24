import React from 'react';
import AttributesTools from '../AttributesTools/AttributesTools';

interface TextToolsProps {
    selectedElement: HTMLElement;
    handleChange: (attribute: string, value: string) => void;
}

const TextTools: React.FC<TextToolsProps> = ({ selectedElement, handleChange }) => (
    <AttributesTools
        selectedElement={selectedElement}
        handleChange={handleChange}
        attributes={{
            x: 'readOnly',
            y: 'readOnly',
            'font-family': ['arial', 'newroman', 'serif', 'sans-serif', 'fantasy', 'monospace'],
            'font-size': 'number',
        }}
    />
);

export default TextTools;