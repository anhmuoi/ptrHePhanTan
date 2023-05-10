import React, { Component, useState } from 'react';

const TextInputModal = (props) => {
    const [text, setText] = useState('');
    const handleOnClick = () => {
        props?.onSaveChanges(text);
        props.onClose();
    };
    let activeClass = '';
    if (props?.show) {
        activeClass = 'is-active';
    }

    return (
        <div className={`modal  ${activeClass}`}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <button className="delete" aria-label="close" onClick={props.onClose} >x</button>
                </header>
                <section className="modal-card-body">
                    <textarea className="textarea" type="text" onChange={(e) => setText(e.target.value)} />
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={() => handleOnClick()}>
                        Save changes
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default TextInputModal;
