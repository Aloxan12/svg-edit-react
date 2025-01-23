import './styles/global.scss'
import React, {Suspense} from 'react';
import { CanvasAsync } from "./Canvas/Canvas.async";

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
        <Suspense fallback='Loading'>
            <CanvasAsync svgContent={''} locale='ru' svgUpdate={ (svgContent: string) => {}} onClose={()=> {}} log={()=>{}} />
        </Suspense>
    </div>;
};