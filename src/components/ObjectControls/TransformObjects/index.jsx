import React, { useState } from 'react';
import * as canvasUtils from '../../../utils/CanvasUtils.jsx';

const TransformObjects = () => {
    const [rotating, setRotating] = useState(0);
    const handleClick = (functionId) => {
        console.log('fhdldfhgjk');
        switch (functionId) {
            case 1:
                canvasUtils.flipObject('X');
                break;
            case 2:
                canvasUtils.flipObject('Y');
                break;
            case 3:
                setRotating((prev) => prev + 90);
                canvasUtils.rotateObject(rotating);
                break;
            case 4:
                setRotating((prev) => prev - 90);
                canvasUtils.rotateObject(rotating);
                break;
            default:
                return 0;
        }
    };
    return (
        <div className="one-rem-mb">
            <label htmlFor="objectName" className="label is-small">
                TRANSFORM
            </label>
            <div className="buttons has-addons">
                <span
                    data-tooltip="Flip Vertical"
                    onClick={() => handleClick(1)}
                    role="button"
                    tabIndex="0"
                    className="button is-primary is-outlined tooltip"
                >
                    {' '}
                    flip
                    <i className="icon-flip-vertical" />
                </span>
                {/* <span
                    data-tooltip="Flip Horizontal"
                    onClick={() => handleClick(2)}
                    role="button"
                    tabIndex="-1"
                    className="button is-primary is-outlined tooltip"
                >
                    {' '}
                    - 180 độ
                    <i className="icon-flip-horizontal" />
                </span> */}
                <span
                    data-tooltip="Rotate 90&#176; Clockwise"
                    onClick={() => handleClick(3)}
                    role="button"
                    tabIndex="-2"
                    className="button is-primary is-outlined tooltip"
                >
                    {' '}
                    90 độ
                    <i className="icon-rotate-90-clockwise" />
                </span>
                <span
                    data-tooltip="Rotate 90&#176; Counterclockwise"
                    onClick={() => handleClick(4)}
                    role="button"
                    tabIndex="-3"
                    className="button is-primary is-outlined tooltip"
                >
                    {' '}
                    -90 độ
                    <i className="icon-rotate-90-counterclockwise" />
                </span>
            </div>
        </div>
    );
};

export default TransformObjects;
