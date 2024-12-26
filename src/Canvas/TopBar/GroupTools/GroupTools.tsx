import React from 'react';
import IconButton from '../../IconButton/IconButton';

interface GroupToolsProps {
  canvas?: {
    groupSelectedElements: () => void;
    ungroupSelectedElement: () => void;
  } | null;
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
    </>
);

export default GroupTools;
