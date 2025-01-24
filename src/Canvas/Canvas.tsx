import React, { KeyboardEvent, useContext, useRef } from 'react'
import svg from '../services/svg'
import TopBar from './ui/TopBar/TopBar'
import LeftBar from './ui/LeftBar/LeftBar'
import BottomBar from './ui/BottomBar/BottomBar'
import { canvasContext, CanvasContextProvider } from './context/canvasContext'
import cls from './Canvas.module.scss'
import { useInitEditorEffect } from './hooks/useInitEditorEffect'

interface CanvasProps {
  svgContent: string
  locale: string
  svgUpdate: (svgContent: string) => void
  onClose: () => void
  log: (functionName: string, args?: any) => void
}

const Canvas: React.FC<CanvasProps> = ({
  svgContent = '<svg x={0} y={0} width="640" height="480" xmlns="http://www.w3.org/2000/svg"></svg>',
  locale,
  svgUpdate,
  onClose,
  log,
}) => {
  const textRef = useRef<HTMLInputElement>(null)
  const svgcanvasRef = useRef<HTMLDivElement>(null)
  const oiAttributes = useRef(svg.saveOIAttr(svgContent))
  const [canvasState, dispatchCanvasState] = useContext<any>(canvasContext)

  const updateContextPanel = () => {
    let elem = canvasState.selectedElement
    if (elem && !elem.parentNode) {
      elem = null
    }
    if (elem) {
      const { tagName } = elem
      if (tagName === 'text' && textRef.current) {
        textRef.current.value = elem.textContent || ''
      }
    }
  }
  const selectedHandler = (win: any, elems: HTMLElement[]) => {
    log('selectedHandler', elems)
    const selectedElement = elems.length === 1 || !elems[1] ? elems[0] : null
    const multiselected = elems.length >= 2 && !!elems[1]
    dispatchCanvasState?.({
      type: 'selectedElement',
      selectedElement,
      multiselected,
    })
  }

  const changedHandler = (win: any, elems: any[]) => {
    log('changedHandler', { elems })
    dispatchCanvasState?.({ type: 'updated', updated: true })
  }

  const contextsetHandler = (win: any, context: any) => {
    dispatchCanvasState?.({ type: 'context', context })
  }

  const svgUpdateHandler = (svgString: string) => {
    svgUpdate(svg.restoreOIAttr(svgString, oiAttributes.current))
    dispatchCanvasState?.({ type: 'updated', updated: false })
  }

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    dispatchCanvasState?.({
      type: 'setTextContent',
      text: (event.target as HTMLInputElement).value,
    })
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

  useInitEditorEffect({
    svgcanvasRef,
    log,
    eventList,
    textRef,
    svgContent,
    oiAttributes,
  })

  updateContextPanel()

  return (
    <div className={cls.editorWrap}>
      <TopBar svgUpdate={svgUpdateHandler} onClose={onClose} />
      <div className={cls.editor} role="main">
        <LeftBar />
        <div className={`${cls.workarea}`}>
          <div ref={svgcanvasRef} className={`${cls.svgcanvas}`} />
        </div>
      </div>
      <BottomBar />
      <input
        ref={textRef}
        onKeyUp={onKeyUp}
        type="text"
        style={{ position: 'absolute', left: '-9999px' }}
      />
    </div>
  )
}

const CanvasWithContext: React.FC<CanvasProps> = (props) => (
  <CanvasContextProvider>
    <Canvas {...props} />
  </CanvasContextProvider>
)

export default CanvasWithContext
