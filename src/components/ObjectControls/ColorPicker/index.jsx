import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { useSelector } from 'react-redux';
import * as canvasUtils from '../../../utils/CanvasUtils.jsx';

const ColorPicker = (props) => {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        canvasUtils.changeColor(color);
    }, [color]);

    console.log(color);
    const handleChangeComplete = (color) => {
        console.log(color.hex);
        setColor(color.hex);
    };

    const handleSwatchClick = () => {
        console.log('dsfjsld');
        setDisplayColorPicker(!displayColorPicker);
    };

    return (
        <div className="one-rem-mb">
            <label htmlFor="objectName" className="label is-small">
                COLOR
            </label>
            <div className="swatch" title={color} onClick={() => handleSwatchClick()} style={{ backgroundColor: `${color ? color : '#391cd7'}` }} />
            {displayColorPicker ? (
                <div className="popover">
                    <div className="cover" onClick={() => handleSwatchClick()} />
                    <ChromePicker color={color} onChange={(color) => handleChangeComplete(color)} />
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ColorPicker;
