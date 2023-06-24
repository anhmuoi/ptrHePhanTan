import React from 'react';
import ColorPicker from './ColorPicker';
import OpacitySlider from './OpacitySlider';
import TagColor from './TagColor/index.jsx';
import TransformObjects from './TransformObjects';

const DEFAULT_OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%',
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%',
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200,
        },
        unit: '%',
    },

    {
        name: 'Hue Rotate',
        property: 'huerotate',
        value: 0,
        range: {
            min: 0,
            max: 360,
        },
        unit: 'deg',
    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20,
        },
        unit: 'px',
    },
];
// const ObjectControlsContainer = () => {
//     return (
//         <div className="object-controls-container">
//             <ColorPicker />
//             {DEFAULT_OPTIONS.map((item) => (
//                 <OpacitySlider option={item} />
//             ))}
//             <TransformObjects />
//             <TagColor />
//         </div>
//     );
// };

const ObjectControlsContainer = () => {
    return (
        <div className="object-controls-container">
            <ColorPicker />
            {DEFAULT_OPTIONS.map((item) => (
                <OpacitySlider option={item} />
            ))}
            <TransformObjects />
            <TagColor />
        </div>
    );
};

export default ObjectControlsContainer;
