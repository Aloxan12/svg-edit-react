declare module '@svgedit/svgcanvas' {
    class SvgCanvas {
        constructor(editorDom: HTMLElement, config: any);

        textActions: {
            setInputElem: (inputElem: HTMLInputElement) => void;
        };

        bind(eventName: string, handler: Function): void;
    }

    export = SvgCanvas;
}