import React, {useRef, useContext, useLayoutEffect} from 'react'
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

const Canvas: React.FC<CanvasProps> = ({
                                         svgContent = '<svg x="0px" y="0px" width="640" height="480" xmlns="http://www.w3.org/2000/svg"></svg>',
                                         locale,
                                         svgUpdate,
                                         onClose,
                                         log,
                                       }) => {
  const textRef = useRef<HTMLInputElement>(null);
  const svgcanvasRef = useRef<SVGSVGElement>(null);
  const oiAttributes = useRef(svg.saveOIAttr(svgContent));
  const [canvasState, dispatchCanvasState] = useContext<any>(canvasContext);
  log('Canvas', { locale, canvasState });
  const updateContextPanel = () => {
    let elem = canvasState.selectedElement;
    if (elem && !elem.parentNode) {
      elem = null;
    }
    if (elem) {
      const { tagName } = elem;
      if (tagName === 'text' && textRef.current) {
        textRef.current.value = elem.textContent || '';
      }
    }
  };
  const selectedHandler = (win: any, elems: HTMLElement[]) => {
    log('selectedHandler', elems);
    const selectedElement = elems.length === 1 || !elems[1] ? elems[0] : null;
    const multiselected = elems.length >= 2 && !!elems[1];
    dispatchCanvasState?.({
      type: 'selectedElement',
      selectedElement,
      multiselected,
    });
  };

  const changedHandler = (win: any, elems: any[]) => {
    log('changedHandler', { elems });
    dispatchCanvasState?.({ type: 'updated', updated: true });
  };

  const contextsetHandler = (win: any, context: any) => {
    dispatchCanvasState?.({ type: 'context', context });
  };

  const svgUpdateHandler = (svgString: string) => {
    svgUpdate(svg.restoreOIAttr(svgString, oiAttributes.current));
    dispatchCanvasState?.({ type: 'updated', updated: false });
  };

  const onKeyUp = (event: any) => {
    dispatchCanvasState?.({ type: 'setTextContent', text: event.target.value });
  };

  const onKeyDown = (event: any) => {
    const target = event.target as HTMLElement;
    if (event.key === 'Backspace' && target?.tagName !== 'INPUT') {
      event.preventDefault();
      dispatchCanvasState?.({ type: 'deleteSelectedElements' });
    }
    // Удаление с клавишей Delete
    if (event.key === 'Delete' && target?.tagName !== 'INPUT') {
      event.preventDefault();
      dispatchCanvasState?.({ type: 'deleteSelectedElements' });
    }
  };

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
  };

  useLayoutEffect(() => {
    if (!svgcanvasRef.current) {
      console.error('svgcanvasRef is not initialized');
      return;
    }
    if (canvasState.canvas) {
      console.log('Canvas is already initialized');
      return;
    }

    const editorDom = svgcanvasRef.current;
    const canvas = new SvgCanvas(editorDom, config);

    if (!canvas || typeof canvas.bind !== 'function') {
      console.error('Canvas or bind method is not available');
      return;
    }

    updateCanvas(canvas, svgcanvasRef.current, config, true);
    if (textRef.current) {
      canvas.textActions.setInputElem(textRef.current as HTMLInputElement);
    }
    Object.entries(eventList).forEach(([eventName, eventHandler]) => {
      canvas.bind(eventName, eventHandler);
    });
    dispatchCanvasState?.({ type: 'init', canvas, svgcanvas: editorDom, config});

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    log('new svgContent', svgContent.length);
    if (!canvasState.canvas) {
      return;
    }
    if (!svgContent) {
      console.error('Invalid SVG content:', svgContent);
      return;
    }
    if (canvasState.canvas) {
      console.log('Canvas is already initialized');
      return;
    }

    oiAttributes.current = svg.saveOIAttr(svgContent);
    canvasState.canvas.clear();
    const success = canvasState.canvas.setSvgString(svgContent.replace(/'/g, "\\'"), true);
    if (!success) {
      console.error('Failed to set SVG content');
    }
    updateCanvas(canvasState.canvas, svgcanvasRef.current, config, true);
    dispatchCanvasState?.({ type: 'updated', updated: false });
  }, [svgContent]);

  updateContextPanel();

  return (
      <div className={cls.editorWrap}>
        <TopBar svgUpdate={svgUpdateHandler} onClose={onClose} />
          <div className={cls.editor} role="main">
            <LeftBar />
            <div className={`${cls.workarea}`}>
                <svg ref={svgcanvasRef} className={`${cls.svgcanvas}`} />
            </div>
          </div>
        <BottomBar/>
        <input ref={textRef} onKeyUp={onKeyUp} type="text" style={{ position: 'absolute', left: '-9999px' }} />
      </div>
  );
};

const CanvasWithContext: React.FC<CanvasProps> = (props) => (
    <CanvasContextProvider>
      <Canvas {...props} />
    </CanvasContextProvider>
);

export default CanvasWithContext;