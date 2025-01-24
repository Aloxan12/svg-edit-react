interface InitFill {
  color: string // Цвет в формате строки
  opacity: number // Прозрачность
}

interface InitStroke {
  width: number // Ширина обводки
  color: string // Цвет обводки в формате строки
  opacity: number // Прозрачность обводки
}

interface TextConfig {
  stroke_width: number // Ширина обводки текста
  font_size: number // Размер шрифта
  font_family: string // Семейство шрифта
}

export interface SvgConfig {
  canvasName: string
  canvas_expansion: number // Множитель для области вокруг канваса
  initFill: InitFill // Настройки заливки
  initStroke: InitStroke // Настройки обводки
  text: TextConfig // Настройки текста
  initOpacity: number // Начальная прозрачность
  colorPickerCSS: string | null // CSS для цветового пикера
  initTool: string // Изначальный инструмент
  exportWindowType: 'svg' | 'same' // Тип окна для экспорта
  wireframe: boolean // Режим каркасного отображения
  showlayers: boolean // Показывать слои
  no_save_warning: boolean // Предупреждение при сохранении
  extPath: string // Путь для расширений
  canvgPath: string // Путь для canvg
  jspdfPath: string // Путь для jspdf
  imgPath: string // Путь для изображений
  jGraduatePath: string // Путь для jgraduate
  extIconsPath: string // Путь для иконок расширений
  dimensions: [number, number] // Размеры, вероятно, в виде строк (например, 0, 0)
  gridSnapping: boolean // Привязка к сетке
  gridColor: string // Цвет сетки
  baseUnit: string // Базовая единица измерения
  snappingStep: number // Шаг привязки
  showRulers: boolean // Показывать линейки
  showGrid: boolean // Показывать сетку
}

const config: SvgConfig = {
  canvasName: 'default',
  // The minimum area visible outside the canvas, as a multiple of the image dimensions.
  // The larger the number, the more one can scroll outside the canvas.
  canvas_expansion: 1.5,
  initFill: {
    color: 'FFFFFF', // solid red
    opacity: 1,
  },
  initStroke: {
    width: 2,
    color: '000000', // solid black
    opacity: 1,
  },
  text: {
    stroke_width: 0,
    font_size: 24,
    font_family: 'serif',
  },
  initOpacity: 1,
  colorPickerCSS: null,
  initTool: 'select',
  exportWindowType: 'svg', // 'same' (todo: also support 'download')
  wireframe: false,
  showlayers: false,
  no_save_warning: false,
  // PATH CONFIGURATION
  // The following path configuration items are disallowed in the URL (as should any future path configurations)
  extPath: 'extensions/', // Default will be changed if this is a non-modular load
  canvgPath: 'canvg/', // Default will be changed if this is a non-modular load
  jspdfPath: 'jspdf/', // Default will be changed if this is a non-modular load
  imgPath: 'images/',
  jGraduatePath: 'jgraduate/images/',
  extIconsPath: 'extensions/',
  // DOCUMENT PROPERTIES
  // Change the following to a preference (already in the Document Properties dialog)?
  // dimensions: ['0px', '0px'],
  dimensions: [640, 480],
  // dimensions: [0, 0],
  // EDITOR OPTIONS
  // Change the following to preferences (already in the Editor Options dialog)?
  gridSnapping: false,
  gridColor: 'rgba(0,0,0,0.5)',
  baseUnit: 'px',
  snappingStep: 10,
  showRulers: true,
  // EXTENSION-RELATED (GRID)
  showGrid: false, // Set by ext-grid.js
}

export default config
