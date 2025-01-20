import React from 'react';

import IconButton from '../IconButton/IconButton';
import './LeftBar.less';

import { canvasContext } from '../Context/canvasContext';

const LeftBar: React.FC = () => {
    const [canvasState, canvasStateDispatcher] = React.useContext(canvasContext);
    const { mode } = canvasState;

    const setMode = (newMode: string): void => canvasStateDispatcher({ type: 'mode', mode: newMode as any });

    return (
        <div className="left-bar">
            <IconButton
                icon="Select"
                className={mode === 'select' ? 'selected' : ''}
                onClick={() => setMode('select')}
            />
            <IconButton
                icon="Ellipse"
                className={mode === 'ellipse' ? 'selected' : ''}
                onClick={() => setMode('ellipse')}
            />
            <IconButton
                icon="Rect"
                className={mode === 'rect' ? 'selected' : ''}
                onClick={() => setMode('rect')}
            />
            <IconButton
                icon="Path"
                className={mode === 'path' ? 'selected' : ''}
                onClick={() => setMode('path')}
            />
            <IconButton
                icon="Line"
                className={mode === 'line' ? 'selected' : ''}
                onClick={() => setMode('line')}
            />
            <IconButton
                icon="Text"
                className={mode === 'text' ? 'selected' : ''}
                onClick={() => setMode('text')}
            />
            <IconButton
                icon="Text 222"
                className={mode === 'text' ? 'selected' : ''}
                onClick={() => setMode('text')}
            />
        </div>
    );
};

export default LeftBar;