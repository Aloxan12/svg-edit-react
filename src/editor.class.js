import React from "react";
import Canvas from "./Canvas/Canvas";

const VERSION = '1'

class Editor {
  constructor(root) {
    this.isInit = false;
    this.root = root;
    this.config = {
      debug: true,
      i18n: 'en',
      saveHandler: null,
      onCloseHandler: null,
      debugPrefix: 'editor',
    };
  }

  svgUpdate = (svgContent) => {
    this.svgContent = svgContent;
    if (this.config.saveHandler) {
      this.config.saveHandler(this.svgContent);
    }
  };

  onClose = () => {
    setTimeout(() => {
      this.root.unmount();
      if (this.config.onCloseHandler) {
        this.config.onCloseHandler();
      }
    }, 0); // Defer the unmounting
  };

  load(svgContent) {
    try {
      this.root.render(
          React.createElement(Canvas, {
            svgContent,
            locale: this.config.i18n,
            svgUpdate: this.svgUpdate,
            onClose: this.onClose,
            log: this.logDebugData,
          })
      );
      this.isInit = true;
    } catch (err) {
      console.error('could not load the SVG content', err);
      throw err;
    }
  }

  info() {
    console.info('Editor version:', VERSION);
    return {
      version: VERSION,
      currentConfig: this.config,
      container: this.div,
    };
  }

  getSvg() {
    return this.svgContent;
  }

  configure(name, value) {
    if (typeof this.config[name] === 'undefined') {
      throw new Error(`${name} is not a valid configuration`);
    }
    this.config[name] = value;
    return this.config;
  }

  logDebugData = (functionName, args) => {
    if (this.config.debug) {
      console.info('%c%s', 'color:green', this.config.debugPrefix, functionName, args, new Error().stack.split(/\n/)[2]);
    }
  };
}

export default Editor