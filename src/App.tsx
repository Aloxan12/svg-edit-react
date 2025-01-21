import './styles/global.scss'
import React from 'react';
import Canvas from "./Canvas/Canvas";

export const App = () => {

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
        <div><Canvas svgContent='' locale='ru' svgUpdate={ (svgContent: string) => {}} onClose={()=> {}} log={()=>{}} /></div>
    </div>;
};