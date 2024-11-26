import React, {useEffect} from 'react';

const SvgEditorComponent = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = './path-to-editor/Editor.js';
        script.onload = () => {
            const container = document.getElementById('container');
            if (container) {
                // @ts-ignore
                const svgEditor = new window.Editor(container);
                svgEditor.setConfig({
                    allowInitialUserOverride: true,
                    extensions: [],
                    noDefaultExtensions: false,
                    userExtensions: [/* Добавьте пути к вашим расширениям, если нужно */]
                });
                svgEditor.init();
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Убираем скрипт при размонтировании компонента
        };
    }, []);

    return (
        <div>
            <div id="container" style={{ width: '100%', height: '100vh' }}></div>
        </div>
    );
};

export default SvgEditorComponent;
