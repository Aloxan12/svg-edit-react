import React from 'react';
import IconButton from '../../ui/IconButton/IconButton';

interface DelDupToolsProps {
    canvas?: {
        deleteSelectedElements: () => void;
        cloneSelectedElements: (dx: number, dy: number) => void;
    } | null;
}

const DelDupTools: React.FC<DelDupToolsProps> = ({ canvas }) => (
    <>
        <IconButton icon="Delete" onClick={() => canvas?.deleteSelectedElements()} />
        <IconButton icon="Clone" onClick={() => canvas?.cloneSelectedElements(20, 20)} />
    </>
);

export default DelDupTools;