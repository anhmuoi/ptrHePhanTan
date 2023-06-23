import React, { Component, useState } from 'react';
import * as canvasUtils from '../../utils/CanvasUtils.jsx';
import ImageModal from '../common/imageModal.js';

const GenerateImages = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const handleClick = () => {
        const imgSrc = canvasUtils.generateImage();
        setIsOpen(!isOpen);
        setImgSrc(imgSrc);
    };
    const toggleImageModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="column">
            <button className="button is-primary is-fullwidth" onClick={() => handleClick()}>
                {' '}
                GENERATE{' '}
            </button>
            <ImageModal show={isOpen} src={imgSrc} onClose={() => toggleImageModal()} />
        </div>
    );
};

export default GenerateImages;
