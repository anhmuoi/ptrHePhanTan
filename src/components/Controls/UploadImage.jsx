import React, { Component, useEffect, useState } from 'react';
import * as canvasUtils from '../../utils/CanvasUtils.jsx';

const UploadImage = (props) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            console.log(imagePreviewUrl);
        };
        reader.readAsDataURL(file);
    };
    useEffect(() => {
        canvasUtils.addImage(imagePreviewUrl);
    }, [imagePreviewUrl]);

    return (
        <div className="column">
            <div className="file is-primary is-fullwidth">
                <label className="file-label">
                    <input className="file-input" type="file" name="resume" onChange={(e) => handleImageChange(e)} />
                    <div className="file-cta is-fullwidth">
                        <div className="file-label justify-flex-center">UPLOAD</div>
                    </div>
                </label>
            </div>
        </div>
    );
};

export default UploadImage;
