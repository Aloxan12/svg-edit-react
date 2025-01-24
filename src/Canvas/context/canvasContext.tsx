import React, {
  createContext, Dispatch, ReactNode, useReducer,
} from 'react'
import SvgCanvas from '@svgedit/svgcanvas'
import updateCanvas from '../editor/updateCanvas'

export type ModeType = 'select' | 'textedit' | 'ellipse' | 'rect' | 'path' | 'line' | 'text'

// Типы для состояния Canvas
interface CanvasState {
  mode: ModeType
  selectedElement: HTMLElement | null | undefined
  multiselected: boolean
  updated: boolean
  zoom: number
  context: any | null
  layerName: string
  svgcanvas: HTMLDivElement | null
  config?: any
  canvas?: SvgCanvas
  colorFill?: string
  colorStroke?: string
}

// Типы для действий редьюсера
interface Action {
  type: string
  canvas?: SvgCanvas
  mode?: ModeType
  selectedElement?: HTMLElement | null
  multiselected?: boolean
  zoom?: number
  context?: any
  colorType?: string
  color?: string
  text?: string
  updated?: boolean
  svgcanvas?: HTMLDivElement | null
  config?: any
}

interface CanvasContextProviderProps {
  children: ReactNode
}

// Редьюсер для CanvasContext
const reducer = (state: CanvasState, action: Action): CanvasState => {
  let newMode
  const { canvas } = state

  switch (action.type) {
    case 'init':
      return {
        ...state,
        canvas: action.canvas,
        svgcanvas: action.svgcanvas || null,
        config: action.config,
      }
    case 'mode':
      if (canvas && action.mode) {
        canvas.setMode(action.mode)
      }
      return { ...state, mode: action.mode || 'select' }
    case 'selectedElement':
      console.log('selectedElement,', action?.mode)
      newMode = canvas?.getMode() === 'select'
        ? { mode: 'select' as ModeType }
        : { mode: 'textedit' as ModeType }
      return {
        ...state,
        selectedElement: action.selectedElement ?? null,
        multiselected: action.multiselected ?? false,
        ...newMode,
      }
    case 'zoom':
      if (canvas) {
        canvas.setZoom((action.zoom || 100) / 100)
        updateCanvas(canvas, state.svgcanvas, state.config, false)
      }
      return { ...state, zoom: action.zoom || 100 }
    case 'context':
      return {
        ...state,
        context: action.context,
        layerName: canvas?.getCurrentDrawing()?.getCurrentLayerName() || '',
      }
    case 'color':
      if (canvas && action.colorType && action.color) {
        canvas.setColor(action.colorType, action.color, false)
        return {
          ...state,
          [action.colorType === 'fill' ? 'colorFill' : 'colorStroke']: action.color,
        }
      }
      return state
    case 'deleteSelectedElements':
      if (canvas) {
        canvas.deleteSelectedElements()
      }
      return state
    case 'setTextContent':
      if (canvas && action.text) {
        canvas.setTextContent(action.text)
      }
      return state
    case 'updated':
      newMode = canvas?.getMode() !== 'textedit' ? { mode: 'select' } : {}
      return { ...state, updated: action.updated || false }
    default:
      throw new Error(`unknown action type: ${action.type}`)
  }
}

const canvasInitialState: CanvasState = {
  mode: 'select',
  selectedElement: null,
  multiselected: false,
  updated: false,
  zoom: 100,
  context: null,
  layerName: '',
  svgcanvas: null,
  colorFill: '#FFF',
  colorStroke: '#000',
}

const canvasContext = createContext<[CanvasState, Dispatch<Action>]>([canvasInitialState, () => {}])

const CanvasContextProvider: React.FC<CanvasContextProviderProps> = ({ children }) => (
  <canvasContext.Provider value={useReducer(reducer, canvasInitialState)}>
    {children}
  </canvasContext.Provider>
)

export { canvasContext, CanvasContextProvider }
