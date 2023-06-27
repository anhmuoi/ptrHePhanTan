import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import * as canvasUtils from '../../../utils/CanvasUtils.jsx';
import { getCurrenObjectInfo } from '../objectSlice.js';

const TagColor = () => {
    const currentObjectInfo = useSelector((state) => state.objectInfo.objectInfo);
    const dispatch = useDispatch();
    const [colorSelect, setColorSELECT] = useState(currentObjectInfo.tagColor);

    const handleChangeColor = (color) => {
        console.log(color.hex);
        setColorSELECT(color.hex);
        dispatch(getCurrenObjectInfo({ ...currentObjectInfo, tagColor: color.hex, fill: color.hex }));
        canvasUtils.draw(color.hex);
    };
    
    useEffect(() => {
        canvasUtils.draw(currentObjectInfo.tagColor);
        
    }, []);
    return (
        <div className="one-rem-mb">
            <label htmlFor="objectName" className="label is-small">
                TAG COLOR
            </label>
            <CirclePicker
                className="is-fullwidth"
                circleSize={23}
                circleSpacing={10}
                colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00d1b2']}
                onChangeComplete={(color) => handleChangeColor(color)}
                color={colorSelect}
            />
        </div>
    );
};

export default TagColor;
