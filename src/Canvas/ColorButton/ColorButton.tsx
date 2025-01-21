import React, {useRef, useState} from 'react';
// @ts-ignore
import colorString from 'color-string';
import Icon from '../Icon/Icon';
import './ColorButton.less';
import {RgbStringColorPicker} from "react-colorful";
import {useOutsideClick} from "../../hooks/useOutsideClick";

// Типы пропсов для компонента ColorButton
interface ColorButtonProps {
  onChange: (color: string) => void;
  value?: string;
  title?: string;
}

const ColorButton: React.FC<ColorButtonProps> = ({ onChange, value = '', title = '' }) => {
  const [display, setDisplay] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null)
  const handleClick = () => setDisplay(!display);
  const closeHandleClick = () => setDisplay(false);

  const onChangeComplete = (color: string) => {
      console.log('color', color)
    onChange(color);
  };

  const rgb = colorString.get.rgb(value) || [255, 255, 255]; // Default to white if value is invalid
  const hexColor = colorString.to.hex(rgb);

    useOutsideClick(ref, closeHandleClick, display)
    console.log('value', value)
  return (
      <div ref={ref}>
        {display && rgb && (
            <div
                className="OIe-tools-color-panel"
            >
                <RgbStringColorPicker color={value} onChange={onChangeComplete}/>
            </div>
        )}
          <Icon name={title} className="OIe-tools-color-title"/>
          <div
              className="OIe-tools-color-sample"
              onClick={handleClick}
              style={{ backgroundColor: hexColor }}
        />
      </div>
  );
};

export default ColorButton;