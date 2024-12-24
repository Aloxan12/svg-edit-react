import React from 'react';
import IconButton from '../../IconButton/IconButton';

interface GenericToolsProps {
    canvas: {
        undoMgr: {
            undo: () => void;
            redo: () => void;
        };
        getSvgString: () => string;
    } | null;
    svgUpdate: (svgString: string) => void;
    canvasUpdated: boolean;
    onClose: () => void;
    selectedElement: HTMLElement | null | undefined;
}

const GenericTools: React.FC<GenericToolsProps> = ({ canvas, canvasUpdated, svgUpdate, onClose }) => {
    const onClickUndo = () => {
        canvas?.undoMgr.undo();
        // populateLayers()
    };

    const onClickRedo = () => {
        canvas?.undoMgr.redo();
        // populateLayers()
    };

    const onClickClose = () => {
        if (canvasUpdated) {
            // eslint-disable-next-line no-alert
            if (!window.confirm('A change was not saved, do you really want to exit?')) return;
        }
        onClose();
    };

    return (
        <>
            <IconButton icon="Close" onClick={onClickClose} />
            <IconButton
                icon="Save"
                className={canvasUpdated ? 'enabled' : 'disabled'}
                onClick={() => {
                    if (canvas) {
                        svgUpdate(canvas.getSvgString());
                    }
                }}
            />
            <IconButton icon="Undo" onClick={onClickUndo} />
            <IconButton icon="Redo" onClick={onClickRedo} />
        </>
    );
};

export default GenericTools;
