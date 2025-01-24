import React, { useContext, useLayoutEffect } from 'react'
import SvgCanvas from '@svgedit/svgcanvas'
import svg from '../../services/svg'
import updateCanvas from '../editor/updateCanvas'
import config from '../editor/config'
import { canvasContext } from '../context/canvasContext'

interface UseInitEditorEffectParams {
  svgcanvasRef: React.RefObject<HTMLDivElement>
  textRef: React.RefObject<HTMLInputElement>
  svgContent: string
  oiAttributes: React.MutableRefObject<any>
  log: (functionName: string, args?: any) => void
  eventList: { [p: string]: Function }
}

export const useInitEditorEffect = ({
  svgcanvasRef,
  textRef,
  svgContent,
  oiAttributes,
  log,
  eventList,
}: UseInitEditorEffectParams) => {
  const [canvasState, dispatchCanvasState] = useContext<any>(canvasContext)

  const onKeyDown = (event: any) => {
    const target = event.target as HTMLElement
    if (event.key === 'Backspace' && target?.tagName !== 'INPUT') {
      event.preventDefault()
      dispatchCanvasState?.({ type: 'deleteSelectedElements' })
    }
    // Удаление с клавишей Delete
    if (event.key === 'Delete' && target?.tagName !== 'INPUT') {
      event.preventDefault()
      dispatchCanvasState?.({ type: 'deleteSelectedElements' })
    }
  }

  useLayoutEffect(() => {
    if (!svgcanvasRef.current) {
      console.error('svgcanvasRef is not initialized')
      return
    }
    if (canvasState.canvas) {
      console.log('Canvas is already initialized')
      return
    }

    const editorDom = svgcanvasRef.current
    const canvas = new SvgCanvas(editorDom, config)

    if (!canvas || typeof canvas.bind !== 'function') {
      console.error('Canvas or bind method is not available')
      return
    }

    updateCanvas(canvas, svgcanvasRef.current, config, false)
    if (textRef.current) {
      canvas.textActions.setInputElem(textRef.current as HTMLInputElement)
    }
    Object.entries(eventList).forEach(([eventName, eventHandler]) => {
      canvas.bind(eventName, eventHandler)
    })
    dispatchCanvasState?.({
      type: 'init',
      canvas,
      svgcanvas: editorDom,
      config,
    })

    document.addEventListener('keydown', onKeyDown, { capture: true })

    return () => {
      document.removeEventListener('keydown', onKeyDown, { capture: true })
    }
  }, [dispatchCanvasState])

  useLayoutEffect(() => {
    if (!canvasState.canvas) {
      return
    }
    if (!svgContent) {
      return
    }
    if (canvasState.canvas) {
      console.info('Canvas is already initialized')
      return
    }

    oiAttributes.current = svg.saveOIAttr(svgContent)
    canvasState.canvas.clear()
    const success = canvasState.canvas.setSvgString(svgContent.replace(/'/g, "\\'"), true)
    if (!success) {
      console.error('Failed to set SVG content')
    }
    updateCanvas(canvasState.canvas, svgcanvasRef.current, config, false)
    dispatchCanvasState?.({ type: 'updated', updated: false })
  }, [svgContent, dispatchCanvasState])
}
