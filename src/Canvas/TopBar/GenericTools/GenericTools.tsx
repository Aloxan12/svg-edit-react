import React, {useEffect, useState} from 'react';
import IconButton from '../../IconButton/IconButton';
import SvgCanvas from "@svgedit/svgcanvas";

interface GenericToolsProps {
    canvas?: SvgCanvas | null;
    svgUpdate: (svgString: string) => void;
    canvasUpdated: boolean;
    onClose: () => void;
    selectedElement: HTMLElement | null | undefined;
}

const GenericTools: React.FC<GenericToolsProps> = ({ canvas, canvasUpdated, svgUpdate, onClose }) => {

    const [xmlData, setXmlData] = useState<string | null>(null);

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
    const svgSaveFile = () => {
        const svgElement = document.querySelector('#svgroot');
        if (!svgElement) {
            console.error('SVG element not found!');
            return;
        }
        canvas?.clearSelection()
        const svgContent = svgElement.outerHTML;

        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });

        // Создать временную ссылку для скачивания
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.svg';
        document.body.appendChild(link);

        // Инициировать скачивание
        link.click();

        // Удалить временную ссылку
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    useEffect(() => {
        const fetchXml = async () => {
            // Путь будет работать, если файл находится в public
            const response = await fetch('/humberger.svg');
            const text = await response.text();
            setXmlData(text);
        };
        fetchXml().catch(err => console.log(err));
    }, []);

    const onUploadSvg = () =>{
        console.log('xmlData', xmlData)
        const svgString = xmlData ? xmlData : '';
        canvas?.setSvgString(svgString)
    }

    return (
        <>
            <IconButton icon="Close" onClick={onUploadSvg} />
            <IconButton icon="Save" onClick={svgSaveFile} />
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
