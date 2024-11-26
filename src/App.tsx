import './editor.less'
import React, {useEffect, useLayoutEffect} from 'react';
// @ts-ignore
import Editor from './editor.class'
import ReactDOM from "react-dom/client";
// @ts-ignore
import Canvas from "./Canvas/Canvas";

interface AppProps{
    root: ReactDOM.Root
}

export const App = ({ root }: AppProps) => {

    useLayoutEffect(() => {
            const editor = new Editor(root);
            editor.load('./path_to_svg.svg');

            return () => {
                console.log('editor.isInit', editor.isInit)
                if(editor.isInit){
                    console.log('rendered');
                    // editor.onClose();
                }
            };
    }, []);

    return <div>
    </div>;
};