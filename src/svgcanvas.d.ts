declare module '@svgedit/svgcanvas' {
  class SvgCanvas {
    constructor(editorDom: HTMLDivElement | null, config: any)

    curShape: {
      fill: string
      stroke: string
    }

    contentW: number

    contentH: number

    clearSelection(): void

    setFontSize(value: string): void

    setFontFamily(value: string): void

    addToSelection(elems: any[], bool: boolean): void

    undoMgr: {
      undo: () => void
      redo: () => void
    }

    getSvgString: () => string

    textActions: {
      setInputElem: (inputElem: HTMLInputElement) => void
    }

    groupSelectedElements(): void

    ungroupSelectedElement(): void

    deleteSelectedElements(): void

    cloneSelectedElements(dx: number, dy: number): void

    bind(eventName: string, handler: Function): void

    updateCanvas(w: number, h: number): { x: number; y: number }

    getZoom(): number

    getMode(): string

    setZoom(value?: number): void

    getSvgContent(): any

    setMode(mode: setMode): void

    setColor(colorType: string, color: string, bool: boolean): void

    setTextContent(text: string): void

    getCurrentDrawing(): {
      getCurrentLayerName(): void
    }

    deleteSelectedElements(): void

    convertToPath(elem: HTMLElement): void

    setSvgString(xmlString: string, preventUndo?: any): boolean

    alignSelectedElements(type: string): void
  }

  export = SvgCanvas
}
