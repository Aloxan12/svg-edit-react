import React, { useState } from 'react';
// @ts-ignore
import colorString from 'color-string';
// @ts-ignore
import { SketchPicker } from 'react-color';
import Icon from '../Icon/Icon';
import './ColorButton.less';

// Типы пропсов для компонента ColorButton
interface ColorButtonProps {
  onChange: (color: string) => void;
  value?: string;
  title?: string;
}

const ColorButton: React.FC<ColorButtonProps> = ({ onChange, value = '', title = '' }) => {
  const [display, setDisplay] = useState<boolean>(false);

  const handleClick = () => setDisplay(!display);

  const onChangeComplete = (color: any) => {
    onChange(color?.hex);
    setDisplay(false);
  };

  const rgb = colorString.get.rgb(value) || [255, 255, 255]; // Default to white if value is invalid
  const hexColor = colorString.to.hex(rgb);

  return (
      <div>
        {display && rgb && (
            <SketchPicker
                className="OIe-tools-color-panel"
                color={hexColor}
                onChangeComplete={onChangeComplete}
            />
        )}
        <Icon name={title} className="OIe-tools-color-title" />
        <div
            className="OIe-tools-color-sample"
            onClick={handleClick}
            style={{ backgroundColor: hexColor }}
        />
      </div>
  );
};

export default ColorButton;