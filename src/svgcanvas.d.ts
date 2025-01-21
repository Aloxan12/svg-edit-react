declare module '@svgedit/svgcanvas' {
    class SvgCanvas {
        constructor(editorDom: SVGSVGElement | null, config: any);

        contentW: number
        contentH: number


        clearSelection(): void
        setFontSize(value: string): void
        setFontFamily(value: string): void
        addToSelection(elems:any[], bool: boolean): void

        undoMgr: {
            undo: () => void;
            redo: () => void;
        };
        getSvgString: () => string;

    textActions: {
            setInputElem: (inputElem: HTMLInputElement) => void;
        };

        groupSelectedElements():void
        ungroupSelectedElement():void
        deleteSelectedElements(): void;
        cloneSelectedElements(dx: number, dy: number): void;

        bind(eventName: string, handler: Function): void;
        updateCanvas(w: number, h: number): {x: number, y: number};

        getZoom(): number;
        setZoom(value?: number): void;

        getMode(): ModeType;
        setMode(mode:setMode): void;

        setColor(colorType: string,color: string, bool: boolean ): void;

        setTextContent(text: string ): void;

        getCurrentDrawing(): {
            getCurrentLayerName(): void
        }
        deleteSelectedElements(): void
    }

    export = SvgCanvas;
}