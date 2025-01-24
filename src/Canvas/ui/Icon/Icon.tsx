import React from 'react'

import group from './images/group_elements.svg'
import ungroup from './images/ungroup.svg'
import undo from './images/undo.svg'
import redo from './images/redo.svg'
import select from './images/select.svg'
import line from './images/line.svg'
import circle from './images/circle.svg'
import ellipse from './images/ellipse.svg'
import square from './images/square.svg'
import rect from './images/rect.svg'
import save from './images/save.svg'
import text from './images/text.svg'
import del from './images/delete.svg'
import clone from './images/clone.svg'
import path from './images/path.svg'
import alignBottom from './images/align_bottom.svg'
import alignCenter from './images/align_center.svg'
import alignTop from './images/align_top.svg'
import alignLeft from './images/align_left.svg'
import alignRight from './images/align_right.svg'
import alignMiddle from './images/align_middle.svg'
import align from './images/align.svg'
import moveBottom from './images/move_bottom.svg'
import moveTop from './images/move_top.svg'
import bold from './images/bold.svg'
import italic from './images/italic.svg'
import fill from './images/fill.svg'
import stroke from './images/stroke.svg'
import fontSize from './images/fontsize.svg'
import noColor from './images/no_color.svg'
import zoom from './images/zoom.svg'
import close from './images/close.svg'
import copy from './images/copy.svg'
import upload from './images/upload.svg'

// Типы для props
interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string
}

const Icon: React.FC<IconProps> = ({ name, ...otherProps }) => {
  switch (name) {
    case 'Select':
      return <img src={select} alt="select" {...otherProps} />
    case 'Line':
      return <img src={line} alt="line" {...otherProps} />
    case 'Circle':
      return <img src={circle} alt="circle" {...otherProps} />
    case 'Ellipse':
      return <img src={ellipse} alt="ellipse" {...otherProps} />
    case 'Text':
      return <img src={text} alt="text" {...otherProps} />
    case 'Delete':
      return <img src={del} alt="delete" {...otherProps} />
    case 'Clone':
      return <img src={clone} alt="clone" {...otherProps} />
    case 'Path':
      return <img src={path} alt="path" {...otherProps} />
    case 'Square':
      return <img src={square} alt="square" {...otherProps} />
    case 'Rect':
      return <img src={rect} alt="rect" {...otherProps} />
    case 'Close':
      return <img src={close} alt="close" {...otherProps} />
    case 'Save':
      return <img src={save} alt="save" {...otherProps} />
    case 'Undo':
      return <img src={undo} alt="undo" {...otherProps} />
    case 'Redo':
      return <img src={redo} alt="redo" {...otherProps} />
    case 'Group':
      return <img src={group} alt="group" {...otherProps} />
    case 'Ungroup':
      return <img src={ungroup} alt="ungroup" {...otherProps} />
    case 'AlignBottom':
      return <img src={alignBottom} alt="align bottom" {...otherProps} />
    case 'AlignCenter':
      return <img src={alignCenter} alt="align center" {...otherProps} />
    case 'AlignTop':
      return <img src={alignTop} alt="align top" {...otherProps} />
    case 'AlignLeft':
      return <img src={alignLeft} alt="align left" {...otherProps} />
    case 'AlignRight':
      return <img src={alignRight} alt="align right" {...otherProps} />
    case 'AlignMiddle':
      return <img src={alignMiddle} alt="align middle" {...otherProps} />
    case 'Align':
      return <img src={align} alt="align" {...otherProps} />
    case 'MoveBottom':
      return <img src={moveBottom} alt="move bottom" {...otherProps} />
    case 'MoveTop':
      return <img src={moveTop} alt="move top" {...otherProps} />
    case 'Bold':
      return <img src={bold} alt="bold" {...otherProps} />
    case 'Italic':
      return <img src={italic} alt="italic" {...otherProps} />
    case 'Fill':
      return <img src={fill} alt="fill" {...otherProps} />
    case 'Stroke':
      return <img src={stroke} alt="stroke" {...otherProps} />
    case 'FontSize':
      return <img src={fontSize} alt="font size" {...otherProps} />
    case 'NoColor':
      return <img src={noColor} alt="no color" {...otherProps} />
    case 'Zoom':
      return <img src={zoom} alt="zoom" {...otherProps} />
    case 'Copy':
      return <img src={copy} alt="copy" {...otherProps} />
    case 'Upload':
      return <img src={upload} alt="copy" {...otherProps} />
    default:
      return <img src={group} alt="group" {...otherProps} />
  }
}

export default Icon
