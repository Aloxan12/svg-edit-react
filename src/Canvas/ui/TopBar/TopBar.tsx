import React, { useContext, JSX } from 'react';
import RectTools from './RectTools/RectTools';
import EllipseTools from './EllipseTools/EllipseTools';
import CircleTools from './CircleTools/CircleTools';
import PathTools from './PathTools/PathTools';
import TextTools from './TextTools/TextTools';
import GenericTools from './GenericTools/GenericTools';
import DelDupTools from './DelDupTools/DelDupTools';
import GroupTools from './GroupTools/GroupTools';
import AttributesTools from './AttributesTools/AttributesTools';

import { canvasContext } from '../../context/canvasContext';

import './TopBar.scss';

// Типы для props компонента
interface TopBarProps {
  svgUpdate: (svgString: string) => void;
  onClose: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ svgUpdate, onClose }) => {
  const [canvasState] = useContext(canvasContext);
  const { canvas, selectedElement, mode, updated } = canvasState;


  const handleChange = (type: string, newVal: string) => {
    const elem = selectedElement as any;
    switch (type) {
      case 'font-family':
        canvas?.setFontFamily(newVal);
        break;
      case 'font-size':
        canvas?.setFontSize(newVal);
        break;
      case 'id':
        // if the user is changing the id, then de-select the element first
        // change the ID, then re-select it with the new ID
        canvas?.clearSelection();
        elem.id = newVal;
        canvas?.addToSelection([elem], true);
        break;
      default:
        console.error(`type (${type}) not supported`);
    }
  };

  let ElementTools: JSX.Element | null;
  switch (selectedElement?.tagName) {
    case 'rect':
      ElementTools = (
          <RectTools
              canvas={canvas}
              canvasUpdated={updated}
              selectedElement={selectedElement}
              svgUpdate={svgUpdate}
              onClose={onClose}
          />
      );
      break;

    case 'circle':
      ElementTools = (
          <CircleTools
              canvas={canvas}
              canvasUpdated={updated}
              selectedElement={selectedElement}
              svgUpdate={svgUpdate}
              onClose={onClose}
          />
      );
      break;

    case 'ellipse':
      ElementTools = (
          <EllipseTools
              canvas={canvas}
              canvasUpdated={updated}
              selectedElement={selectedElement}
              svgUpdate={svgUpdate}
              onClose={onClose}
          />
      );
      break;

    case 'text':
      ElementTools = (
          <TextTools
              selectedElement={selectedElement}
              handleChange={handleChange}
          />
      );
      break;

    case 'path':
      ElementTools = (
          <PathTools
              canvas={canvas}
              canvasUpdated={updated}
              selectedElement={selectedElement}
              svgUpdate={svgUpdate}
              onClose={onClose}
          />
      );
      break;

    case 'g':
    case 'image':
    case 'line':
    case 'polygon':
    case 'polyline':
    case 'textPath':
    default:
      ElementTools = selectedElement ? (
          <AttributesTools selectedElement={selectedElement} handleChange={handleChange} attributes={{}} />
      ) : null;
  }
  return (
      <div className='top-bar'>
        <GenericTools
            canvas={canvas}
            canvasUpdated={updated}
            selectedElement={selectedElement}
            svgUpdate={svgUpdate}
            onClose={onClose}
        />
        <DelDupTools canvas={canvas} />
        <GroupTools canvas={canvas} multiselected={canvasState.multiselected} selectedElement={selectedElement} />
        {ElementTools && ElementTools}
      </div>
  );
};

export default TopBar;
