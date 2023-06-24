import React, { useEffect, useState } from 'react';
import Slider from 'react-rangeslider';
import * as canvasUtils from '../../../utils/CanvasUtils.jsx';

const OpacitySlider = ({ option }) => {
    const [data, setData] = useState(option);
    // useEffect(() => {
    //     canvasUtils.applyFilter(data.property, data.value, data.unit);
    // }, [data.value]);

    const handleSliderChange = (value) => {
        setData({ ...option, value: value });
        canvasUtils.setFilter(data.property, data.value, data.range.max);
    };

    return (
        <div className="one-rem-mb">
            <label htmlFor="objectName" className="label is-small">
                {data.name}
            </label>
            <Slider min={data.range.min} max={data.range.max} step={1} value={data.value} onChange={(value) => handleSliderChange(value)} />
        </div>
    );
};

export default OpacitySlider;
