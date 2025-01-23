import React from 'react';
import IconButton from '../../IconButton/IconButton';
import SvgCanvas from "@svgedit/svgcanvas";

interface GroupToolsProps {
  canvas?: SvgCanvas | null
  selectedElement?: HTMLElement | null;
  multiselected: boolean;
}

const GroupTools: React.FC<GroupToolsProps> = ({ canvas, selectedElement, multiselected }) => (
    <>
      {multiselected && canvas && (
          <IconButton
              icon="Group"
              onClick={() => {
                canvas.groupSelectedElements();
              }}
          />
      )}
      {selectedElement?.tagName === 'g' && canvas && (
          <IconButton
              icon="ungroup"
              onClick={() => {
                canvas.ungroupSelectedElement();
              }}
          />
      )}
      {multiselected && canvas && (
          <>
            <IconButton
                icon="AlignTop"
                onClick={() => {
                  canvas.alignSelectedElements('top');
                }}
            />
            <IconButton
                icon="AlignRight"
                onClick={() => {
                  canvas.alignSelectedElements('right');
                }}
            />
            <IconButton
                icon="AlignBottom"
                onClick={() => {
                  canvas.alignSelectedElements('bottom');
                }}
            />
            <IconButton
                icon="AlignLeft"
                onClick={() => {
                  canvas.alignSelectedElements('left');
                }}
            />
          </>
      )}
    </>
);

export default GroupTools;
