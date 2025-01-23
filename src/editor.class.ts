import React from 'react'
import ReactDOM from 'react-dom/client'
import Canvas from './Canvas/Canvas'

interface EditorConfig {
  debug: boolean;
  i18n: string;
  saveHandler: ((svgContent: string) => void) | null;
  onCloseHandler: (() => void) | null;
  debugPrefix: string;
  [key: string]: any;
}

class Editor {
  isInit: boolean

  root: ReactDOM.Root

  config: EditorConfig

  svgContent: string

  div: HTMLDivElement | null

  constructor(root: ReactDOM.Root) {
    this.isInit = false
    this.root = root
    this.config = {
      debug: true,
      i18n: 'en',
      saveHandler: null,
      onCloseHandler: null,
      debugPrefix: 'editor',
    }
    this.svgContent = ''
    this.div = null
  }

  svgUpdate = (svgContent: string): void => {
    this.svgContent = svgContent
    if (this.config.saveHandler) {
      this.config.saveHandler(this.svgContent)
    }
  }

  onClose = (): void => {
    setTimeout(() => {
      this.root.unmount()
      if (this.config.onCloseHandler) {
        this.config.onCloseHandler()
      }
    }, 0) // Defer the unmounting
  }

  load(svgContent: string): void {
    try {
      this.root.render(
        React.createElement(Canvas, {
          svgContent,
          locale: this.config.i18n,
          svgUpdate: this.svgUpdate,
          onClose: this.onClose,
          log: this.logDebugData,
        }),
      )
      this.isInit = true
    } catch (err) {
      console.error('Could not load the SVG content', err)
      throw err
    }
  }

  info() {
    console.info('Editor version:', '1')
    return {
      version: '1',
      currentConfig: this.config,
      container: this.div,
    }
  }

  getSvg() {
    return this.svgContent
  }

  configure(name: string, value: any): EditorConfig {
    if (typeof this.config[name] === 'undefined') {
      throw new Error(`${name} is not a valid configuration`)
    }
    this.config[name] = value
    return this.config
  }

  logDebugData = (functionName: string, args: any): void => {
    if (this.config.debug) {
      console.info(
        '%c%s',
        'color:green',
        this.config.debugPrefix,
        functionName,
        args,
        new Error().stack?.split(/\n/)[2],
      )
    }
  }
}

export default Editor
