import React, { useEffect } from 'react';
import * as canvasUtils from '../utils/CanvasUtils.jsx';

const Canvas = () => {
    useEffect(() => {
        canvasUtils.initializeCanvas();
        canvasUtils.setCanvasSize(900, 500);
    }, []);
    return <canvas id="mockup_canvas" />;
};

export default Canvas;
