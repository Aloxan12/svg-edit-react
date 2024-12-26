import React, { useRef, useContext, useLayoutEffect } from 'react'
import SvgCanvas from '@svgedit/svgcanvas'
import svg from '../services/svg'
import config from './editor/config'
import TopBar from './TopBar/TopBar'
import LeftBar from './LeftBar/LeftBar'
import BottomBar from './BottomBar/BottomBar'
import updateCanvas from './editor/updateCanvas'
import { canvasContext, CanvasContextProvider } from './Context/canvasContext'
import cls from './Canvas.module.scss'

// Типы пропсов
interface CanvasProps {
  svgContent: string;
  locale: string;
  svgUpdate: (svgContent: string) => void;
  onClose: () => void;
  log: (functionName: string, args?: any) => void;
}

// // Типы состояния canvasContext
// interface CanvasState {
//   selectedElement: HTMLElement | null;
//   multiselected: boolean;
//   canvas: SvgCanvas | null;
// }

const Canvas: React.FC<CanvasProps> = ({ svgContent = '<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg"></svg>', locale, svgUpdate, onClose, log }) => {
  const textRef = useRef<HTMLInputElement>(null)
  const svgcanvasRef = useRef<HTMLDivElement>(null)
  const oiAttributes = useRef(svg.saveOIAttr(svgContent))
  const [canvasState, dispatchCanvasState] = useContext<any>(canvasContext)

  log('Canvas', { locale, canvasState })

  const updateContextPanel = () => {
    let elem = canvasState.selectedElement
    // If element has just been deleted, consider it null
    if (elem && !elem.parentNode) {
      elem = null
    }
    if (elem) {
      const { tagName } = elem
      if (tagName === 'text') {
        // we should here adapt the context to a text field
        if (textRef.current) {
          textRef.current.value = elem.textContent || ''
        }
      }
    }
  }

  const selectedHandler = (win: any, elems: HTMLElement[]) => {
    log('selectedHandler', elems)
    const selectedElement = elems.length === 1 || !elems[1] ? elems[0] : null
    const multiselected = elems.length >= 2 && !!elems[1]
    dispatchCanvasState({
      type: 'selectedElement',
      selectedElement,
      multiselected,
    })
  }

  const changedHandler = (win: any, elems: any[]) => {
    log('changedHandler', { elems })
    dispatchCanvasState({ type: 'updated', updated: true })
  }

  const contextsetHandler = (win: any, context: any) => {
    dispatchCanvasState({ type: 'context', context })
  }

  const svgUpdateHandler = (svgString: string) => {
    svgUpdate(svg.restoreOIAttr(svgString, oiAttributes.current))
    dispatchCanvasState({ type: 'updated', updated: false })
  }

  const onKeyUp = (event: any) => {
    dispatchCanvasState({ type: 'setTextContent', text: event.target.value })
  }

  const onKeyDown = (event: any) => {
    if (event.key === 'Backspace' && event.target && (event.target as HTMLElement).tagName !== 'INPUT') {
      event.preventDefault()
      dispatchCanvasState({ type: 'deleteSelectedElements' })
    }
  }

  const eventList: { [key: string]: Function } = {
    selected: selectedHandler,
    changed: changedHandler,
    contextset: contextsetHandler,
    'extension-added': () => log('extensionAddedHandler'),
    cleared: () => log('clearedHandler'),
    exported: () => log('exportedHandler'),
    exportedPDF: () => log('exportedPDFHandler'),
    message: () => log('messageHandler'),
    pointsAdded: () => log('pointsAddedHandler'),
    saved: () => log('savedHandler'),
    setnonce: () => log('setnonceHandler'),
    unsetnonce: () => log('unsetnonceHandler'),
    transition: () => log('transitionHandler'),
    zoomed: () => log('zoomedHandler'),
    zoomDone: () => log('zoomDoneHandler'),
    updateCanvas: () => log('updateCanvasHandler'),
    extensionsAdded: () => log('extensionsAddedHandler'),
  }

  useLayoutEffect(() => {
    const editorDom = svgcanvasRef.current
    const canvas = new SvgCanvas(editorDom, config)
    updateCanvas(canvas, svgcanvasRef.current, config, true)
    canvas.textActions.setInputElem(textRef.current as HTMLInputElement)
    Object.entries(eventList).forEach(([eventName, eventHandler]) => {
      canvas.bind(eventName, eventHandler)
    })
    dispatchCanvasState({ type: 'init', canvas, svgcanvas: editorDom, config })
    document.addEventListener('keydown', onKeyDown)
    return () => {
      // cleanup function
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useLayoutEffect(() => {
    log('new svgContent', svgContent.length)
    if (!canvasState.canvas) return
    oiAttributes.current = svg.saveOIAttr(svgContent)
    canvasState.canvas.clear()
    const success = canvasState.canvas.setSvgString(svgContent.replace(/'/g, "\\'"), true) // true => prevent undo
    updateCanvas(canvasState.canvas, svgcanvasRef.current, config, true)
    dispatchCanvasState({ type: 'updated', updated: false })
  }, [svgContent, canvasState.canvas])

  updateContextPanel()

  return (
      <div className={cls.editorWrap}>
        <TopBar svgUpdate={svgUpdateHandler} onClose={onClose} />
        <LeftBar />
        <BottomBar />
        <div className="OIe-editor" role="main">
          <div className="workarea">
            <div ref={svgcanvasRef} className="svgcanvas" style={{ position: 'relative' }} />
          </div>
        </div>
        <input ref={textRef} onKeyUp={onKeyUp} type="text" style={{ position: 'absolute', left: '-9999px' }} />
      </div>
  )
}

const CanvasWithContext: React.FC<CanvasProps> = (props) => (
    <CanvasContextProvider>
      <Canvas {...props} />
    </CanvasContextProvider>
)

export default CanvasWithContext