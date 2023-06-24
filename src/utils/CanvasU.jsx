import { fabric } from 'fabric';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';

let canvas = null;

export function initializeCanvas() {
    canvas = window._canvas = new fabric.Canvas('mockup_canvas');
    canvas.on('object:selected');
}

export function getCanvasInstance() {
    if (canvas == null) {
        initializeCanvas();
        return canvas;
    }
    return canvas;
}

export function setCanvasSize(width = 500, height = 500) {
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.isDrawingMode = true;
}
export function deleteObject() {
    canvas.remove(canvas.getActiveObject());
}

export function addShape(shape, fill, tagColor) {
    console.log('Got executed', 'FFFFFFF');
    switch (shape) {
        case 'rectangle': {
            canvas.add(
                new fabric.Rect({
                    width: 50,
                    height: 50,
                    left: 50,
                    top: 50,
                    fill: fill,
                    opacity: 1,
                    id: uniqid('rect-'),
                    name: 'Rectangle',
                    tagColor: tagColor,
                    flipX: false,
                    flipY: false,
                    stroke: 'black',
                    strokeWidth: 1,
                })
            );
            break;
        }
        case 'circle': {
            canvas.add(
                new fabric.Circle({
                    radius: 40,
                    left: 50,
                    top: 50,
                    fill: fill,
                    opacity: 1,
                    id: uniqid('circ-'),
                    name: 'Circle',
                    tagColor: tagColor,
                    flipX: false,
                    flipY: false,
                    stroke: 'black',
                    strokeWidth: 1,
                })
            );
            break;
        }
        default: {
            return 0;
        }
    }

    canvas.renderAll();
}

export function stopDraw() {
    canvas.isDrawingMode = false;
    canvas.renderAll();
}
export function draw(tagColor) {
    canvas.isDrawingMode = true;
    console.log(tagColor);
    // set color draw
    canvas.freeDrawingBrush.color = tagColor;

    canvas.renderAll();
}

export function addText(text, tagColor) {
    canvas.add(new fabric.Text(text, { left: 100, top: 100, fill: tagColor }));
    canvas.renderAll();
}

export function changeColor(color) {
    if (canvas.getActiveObject() != null) {
        canvas.isDrawingMode = false;

        canvas.getActiveObject().set('fill', color);
        canvas.renderAll();
    }
    return 0;
}
export function changeOpacity(opacity) {
    if (canvas.getActiveObject() != null) {
        canvas.getActiveObject().set('opacity', opacity);
        canvas.renderAll();
    }
    return 0;
}

const initializeFilter = (activeObj) => {
    if (activeObj) {
        activeObj.filters = [];
        activeObj.filters.push(new fabric.Image.filters.Blur({ blur: 0 }));
        activeObj.filters[0].value = 0;
        activeObj.filters.push(new fabric.Image.filters.Saturation({ saturation: 0 }));
        activeObj.filters[1].value = 0;
        activeObj.filters.push(new fabric.Image.filters.HueRotation({ rotation: 0 }));
        activeObj.filters[2].value = 0;
        activeObj.filters.push(
            new fabric.Image.filters.Brightness({
                brightness: 0,
            })
        );
        activeObj.filters[3].value = 0;
        activeObj.filters.push(new fabric.Image.filters.Contrast({ contrast: 0 }));
        activeObj.filters[4].value = 0;
        // activeObj.filters.push(new fabric.Image.filters.Grayscale({ grayscale: 0 }));
        // activeObj.filters[5].value = 0;

        activeObj.applyFilters();
    }
};

const createFilter = (activeObj, type) => {
    if (activeObj && activeObj.type === 'image') {
        activeObj.filters = [];
        if (type !== 'figure') {
            initializeFilter(activeObj);
            activeObj.filterPercentage = 100;
        }
    }
    canvas.requestRenderAll();
};

const getPercentage = (originalValue, percentage) => {
    const value = Math.round((originalValue * percentage) / 100);
    if (!value) {
        return 0;
    } else {
        return value;
    }
};

export const setFilter = (name, num, max) => {
    var activeObj = canvas.getActiveObject();
    console.log(activeObj.filters.length);
    if (activeObj.filters.length === 0) {
        createFilter(activeObj);
        return;
    }

    if (activeObj) {
        const percentage = 100;
        switch (name) {
            case 'blur':
                // activeObj.filters.splice(10, 1);
                activeObj.filters[0].blur = getPercentage(Number(num), percentage) / max;
                activeObj.filters[0].value = num;
                break;
            case 'saturate':
                activeObj.filters[1].saturation = getPercentage(Number(num), percentage) / max;
                activeObj.filters[1].value = num;
                break;
            case 'huerotate':
                activeObj.filters[2].rotation = getPercentage(Number(num), percentage) / max;
                activeObj.filters[2].value = num;
                break;
            case 'brightness':
                activeObj.filters[3].brightness = getPercentage(Number(num), percentage) / max;
                activeObj.filters[3].value = num;
                break;
            case 'contrast':
                activeObj.filters[4].contrast = getPercentage(Number(num), percentage) / max;
                activeObj.filters[4].value = num;
                break;

            // case 'grayscale':
            //     activeObj.filters[5].grayscale = getPercentage(Number(num), percentage) / max;
            //     activeObj.filters[5].value = num;
            //     break;
            default:
                break;
        }
        activeObj.applyFilters();
        canvas.requestRenderAll();
    }
};

export function applyFilter(filterType, value, unit = '') {
    console.log(canvas.getActiveObject());
    if (canvas.getActiveObject() != null) {
        let filter;
        switch (filterType) {
            case 'opacity':
                filter = new fabric.Image.filters.Alpha({
                    alpha: value + unit,
                });
                break;
            case 'blur':
                filter = new fabric.Image.filters.Blur({
                    blur: value + unit,
                });
                break;
            case 'brightness':
                filter = new fabric.Image.filters.Brightness({
                    brightness: value + unit,
                });
                break;
            case 'contrast':
                filter = new fabric.Image.filters.Contrast({
                    contrast: value + unit,
                });
                break;

            case 'grayscale':
                filter = new fabric.Image.filters.Grayscale({
                    grayscale: value + unit,
                });
                break;
            case 'sepia':
                filter = new fabric.Image.filters.Sepia({
                    sepia: value + unit,
                });
                break;
            case 'huerotate':
                filter = new fabric.Image.filters.HueRotation({
                    rotation: value + unit,
                });
                break;
            default:
                return;
        }

        console.log(filter[filterType]);
        let filterList = canvas.getActiveObject().filters.filter((item) => !item.hasOwnProperty(filterType));

        filterList.push(filter);
        console.log(filterList);

        canvas.getActiveObject().filters = filterList;
        canvas.getActiveObject().applyFilters();
        canvas.renderAll();
    }
}

export function addImage(dataURL) {
    fabric.Image.fromURL(dataURL, (img) => {
        // set width for image
        img.scaleToWidth(300);

        canvas.add(img);
        canvas.renderAll();
    });
}
export function generateImage() {
    return canvas.toDataURL({
        format: 'png',
    });
}

// export function sendObjectBackwards() {
//     if (canvas.getActiveObject() != null) {
//         canvas.sendBackwards(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
//     return 0;
// }

// export function sendObjectForwards() {
//     if (canvas.getActiveObject() != null) {
//         canvas.bringForward(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
// }
// export function bringObjectFront() {
//     if (canvas.getActiveObject() != null) {
//         canvas.bringToFront(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
//     return 0;
// }

// export function sendObjectBack() {
//     if (canvas.getActiveObject() != null) {
//         canvas.sendToBack(canvas.getActiveObject());
//         canvas.deactivateAll().renderAll();
//     }
//     return 0;
// }

export function rotateObject(value) {
    const activeObject = canvas.getActiveObject();
    if (activeObject != null) {
        canvas.getActiveObject().rotate(value);
        canvas.renderAll();
    }
}
export function flipObject(direction) {
    const activeObject = canvas.getActiveObject();
    console.log('activeObject.flipY', activeObject.flipY);
    if (activeObject != null) {
        if (direction === 'X') {
            activeObject.flipX = !activeObject.flipX;
        }
    } else if (direction === 'Y') {
        activeObject.flipY = !activeObject.flipY;
    }
    canvas.renderAll();
}

/* reset CSS */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
    font-family: Arial, Helvetica, sans-serif;
}
/* 
1. từ ngoài vào trong
2. từ trên xg dưới
3. tổng quan đến chi tiết
*/
/* 
1. vị trí
2. kích thước (width, height)
3. màu sắc
4. kiểu dáng ( kiểu chữ)
*/

.clear{
    clear: both;
}

.text-white {
    color: white;
}

.text-center {
    text-align: center;
}

.btn {
    color: #fff;
    font-size: 15px;
    font-weight: 500;
    text-decoration: none;
    background-color: black;
    padding: 12px 20px;
    display: inline-block;
    margin-top: 15px;
    border: none;
}

.btn:hover {
    background-color: #ccc;
    color: #000;
}

.pull-right {
    float: right;
}

.mt-8 {
    margin-top: 8px;
}

.mt-16 {
    margin-top: 16px;
}

.row {
    margin-left: -8px;
    margin-right: -8px;
}

.row::after {
    content: "";
    display: block;
    clear: both;
}



.col {
    float: left;
    padding-left: 8px;
    padding-right: 8px;
}

.col-full {
    width: 100%;
}

.col-half {
    width: 50%;
}

.col-third {
    width: 33.33333%;
}

#main{

}

#header{
    z-index: 1;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 46px;
    background-color: black;
}
#nav {
    display: inline-block;
}

#nav, .subnav{
    list-style-type: none;
}   

#nav > li {
    display: inline-block;
}

#nav li{
    position: relative;
}

#nav > li > a {
    color: #fff;
    text-transform: uppercase;
}

#nav li a{
    
    text-decoration: none;
    line-height: 46px;
    padding: 0 24px;
    display: inline-block;
}

#nav li:hover .subnav {
    display: block;
}

#nav > li:hover > a,
#nav .subnav li:hover {
    color: #000;
    background-color: #ccc;
}

#nav .subnav{
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    color: black;
    min-width: 160px;
    box-shadow: 0 0 10px rgba( 0, 0, 0, 0.3);
}
#nav .subnav a { 
    line-height: 38px;
    padding: 0 12px;
    color: black;
}

#nav .subnav-down {
    font-size: 14px;
}

#header .mobile-menu-btn {
    position: absolute;
    top:0;
    right: 0;
    display: none;
}

#header .mobile-menu-btn,
#header .nav-search-btn { 
    float: right;
    line-height: 46px;
}


#header .mobile-menu-btn:hover {
    background-color: #ccc;
}

#header .mobile-menu-btn:hover .ti-menu {
    color: black;
}


#header .menu-icon,
#header .ti-search {
    color: #fff;
    padding: 0 23px;

}

#header .nav-search-btn:hover {
    cursor: pointer;
    background-color: #f44336;
}




#slider{
    position: relative;
    margin-top: 46px;
    padding-top: 50%;
    background: url("./img/slider/slider1.jpg") top center / cover no-repeat;
}

#slider .text-slider  {
    bottom: 47px;
    position: absolute;;
    color: #fff;
    text-align: center;
    width: 100%;
    text-shadow: 0 0 5px #000;

}

#slider .slider-text1 {
    margin: 20px;
    font-size: 24px;
    font-weight: 500;
}

#slider .slider-text2 {
    font-size: 15px;

}

#content{
    line-height: 1.5;

}

#content .content-section {
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 64px 16px;
}

#content .section-heading {
    font-weight: 500;
    font-size: 30px;
    letter-spacing: 4px;
    text-align: center;
    margin: 10px 0;
}

#content .section-sub-heading {
    text-align: center;
    font-size: 15px;
    font-style: italic;
    
    opacity: 0.6;
    margin: 15px 0;
}   

/* the band */

#content .about-text {
   
    text-align: justify;
    line-height: 1.4;
    font-size: 15px;
}

#content .member-list {
    padding: 32px 0;
    
}

#content .member-name {
    margin: 15px 0;

}

#content .member-img {
    width: 60%;
    border-radius: 4px;
}

/* tour section */

.tour-section {
    background-color: black; 

}

.tickets-list {
    background-color: #fff;
    color: #757575;
    margin: auto;
    list-style: none;
    margin-top: 32px;
    

}

.tickets-list li {
    font-size: 15px;
    padding: 8px 15px;
    border-bottom: 1px solid #ddd;
}

.sold-out {
    background-color: #f44336;
    color: #fff;
    padding: 3px 6px;
    margin: 16px;
}

.quantity {
    float:right;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: black;
    color: #fff;
    border-radius: 50%;
    margin:-1px 20px 0 0;   
}

/* place list */

.place-list {
    margin-top: 10px;
    margin-bottom: 34px;
}

.place-img {
    width: 100%;

    display: block;

}

.place-img:hover {
    opacity: 0.6;
}

.place-content {
    font-size: 15px;
    padding: 15px;
    background-color: #fff;
}

.place-heading {
    font-size: 15px;
}

.place-time {
    padding: 15px 0 ;
    opacity: 0.6;
}



.place-desc {

}

/* contract section */

.contract-section {
    padding: 32px 0;
}

.contract-info {
    font-size: 18px;
}

.contract-info i[class*=ti-] {
    width: 30px;
    display: inline-block;
}

.contract-form {
    font-size: 15px;
}

.contract-form .form-control {
    padding: 10px;
    border: 1px solid #ccc;
    width: 100%;
}

/* map img */

.img-map {
    width: 100%;
    filter: grayscale(50%);
}


/* footer section */

#footer{
    padding: 64px 16px;
    text-align: center;

}

.socials-list a {
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    text-decoration: none;
}

.socials-list a:hover {
    color: rgba(0, 0, 0, 0.4);
}

.footer-p {
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;
    margin: 15px 0;

}

.footer-p a {
    color: rgba(0, 0, 0, 0.6);
    
}

.footer-p a:hover {
    color: rgba(0, 0, 0, 0.4);
}


/* modal tickets */

.modal {
    /* display: flex; */
    z-index: 2;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba( 0, 0, 0, 0.6);
    display: none;
    align-items: center;
    justify-content: center;
}

.modal.open {
    display: flex;
}

.modal-container {
    width: 900px;
    max-width: calc(100% - 30px);
    background-color: #fff;
    position: relative;
    animation: animationShowBuyTickets ease .5s;
}

.modal-close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    color: #fff;
}

.modal-close:hover {
    background-color: #ccc;
    color: #000;
    cursor: pointer;
}

.modal-heading {
    padding: 42px;
    font-weight: 400;
    font-size: 36px;
    color: #fff;
    letter-spacing: 4px;
    background-color: #009688;
    text-align: center;
}

.modal-body {
    font-size: 15px;
    padding: 12px;
    
}

.modal-label {
    display: block;
    padding: 12px 0;
}


.modal-input {
    width: 100%;
    padding: 10px;
    margin-top: 0px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
}


.by-tickets {
    border: none;
    width: 100%;
    color: #fff;
    background-color: #009688;
    padding: 14px;
    margin-bottom: 24px;
}

.by-tickets:hover {
    background-color: #ccc;
    color: black;
    cursor: pointer;
}


.modal-footer {
    margin-bottom: 20px;
}

.modal-help {

    text-align: right;
}

.modal-help a {
    color: #2196F3;
}

@keyframes animationShowBuyTickets {
    from {
        opacity: 0.5;
        transform: translateY(-150px);
    }
    to {
        opacity: 1;
        transform: translateY(0);

    }
}
