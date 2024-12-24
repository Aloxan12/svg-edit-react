import React, { ReactNode, useReducer, createContext, Dispatch } from 'react';
import updateCanvas from '../editor/updateCanvas';

// Типы для состояния Canvas
interface CanvasState {
  mode: 'select' | 'textedit' | 'ellipse'
  | 'rect'
  | 'path'
  | 'line'
  | 'text'
  selectedElement: HTMLElement | null | undefined; // Изменен тип для учета undefined
  multiselected: boolean;
  updated: boolean;
  zoom: number;
  context: any | null;
  layerName: string;
  svgcanvas?: HTMLElement | null;
  config?: any;
  canvas?: any; // Это можно заменить на более точный тип, если известен тип canvas
}

// Типы для действий редьюсера
interface Action {
  type: string;
  canvas?: any; // Это можно заменить на более точный тип, если известен тип canvas
  mode?: 'select' | 'textedit' | 'ellipse'
      | 'rect'
      | 'path'
      | 'line'
      | 'text'
  selectedElement?: HTMLElement | null;
  multiselected?: boolean;
  zoom?: number;
  context?: any;
  colorType?: string;
  color?: string;
  text?: string;
  updated?: boolean;
  svgcanvas?: HTMLElement | null;
  config?: any
}

// Тип для пропсов компонента CanvasContextProvider
interface CanvasContextProviderProps {
  children: ReactNode;
}

// Редьюсер для CanvasContext
const reducer = (state: CanvasState, action: Action): CanvasState => {
  let newMode;
  const { canvas } = state;

  switch (action.type) {
    case 'init':
      return { ...state, canvas: action.canvas, svgcanvas: action.svgcanvas, config: action.config };
    case 'mode':
      if (canvas) {
        canvas.setMode(action.mode as string);
      }
      return { ...state, mode: action.mode || 'select' };
    case 'selectedElement':
      newMode = (canvas?.getMode() === 'select') ? { mode: 'select' as "select" | "textedit" } : { mode: 'textedit' as "select" | "textedit" };
      return {
        ...state,
        selectedElement: action.selectedElement ?? null,
        multiselected: action.multiselected ?? false,
        ...newMode
      }; // Обработано undefined
      case 'zoom':
      if (canvas) {
        canvas.setZoom((action.zoom || 100) / 100);
        updateCanvas(canvas, state.svgcanvas, state.config, true);
      }
      return { ...state, zoom: action.zoom || 100 };
    case 'context':
      return { ...state, context: action.context, layerName: canvas?.getCurrentDrawing()?.getCurrentLayerName() || '' };
    case 'color':
      if (canvas && action.colorType && action.color) {
        canvas.setColor(action.colorType, action.color, false);
      }
      return state;
    case 'deleteSelectedElements':
      if (canvas) {
        canvas.deleteSelectedElements();
      }
      return state;
    case 'setTextContent':
      if (canvas && action.text) {
        canvas.setTextContent(action.text);
      }
      return state;
    case 'updated':
      newMode = (canvas?.getMode() !== 'textedit') ? { mode: 'select' } : {};
      return { ...state, updated: action.updated || false };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
}

// Начальное состояние Canvas
const canvasInitialState: CanvasState = {
  mode: 'select',
  selectedElement: null, // Здесь установлено значение null
  multiselected: false,
  updated: false,
  zoom: 100,
  context: null,
  layerName: '',
}

// Контекст для Canvas
const canvasContext = createContext<[CanvasState, Dispatch<Action>]>([
  canvasInitialState,
  () => {},
]);

// Компонент CanvasContextProvider
const CanvasContextProvider: React.FC<CanvasContextProviderProps> = ({ children }) => (
    <canvasContext.Provider value={useReducer(reducer, canvasInitialState)}>
      {children}
    </canvasContext.Provider>
);

export { canvasContext, CanvasContextProvider };