import './editor.less'
import React from 'react';
import ReactDOM from "react-dom/client";
import Canvas from "./Canvas/Canvas";

interface AppProps{
    root: ReactDOM.Root
}

export const App = ({}: AppProps) => {
    const editorContainer = React.useRef<HTMLDivElement | null>(null);

    // useLayoutEffect(() => {
    //         const editor = new Editor(root);
    //         editor.load('');
    //
    //         // return () => {
    //         //     console.log('editor.isInit', editor.isInit)
    //         //     if(editor.isInit){
    //         //         console.log('rendered');
    //         //         editor.onClose();
    //         //     }
    //         // };
    // }, []);

    return <div >
        <div ref={editorContainer} />
        <div><Canvas svgContent='' locale='ru' svgUpdate={ (svgContent: string) => {}} onClose={()=> {}} log={()=>{}} /></div>
        <div>hello world</div>
    </div>;
};