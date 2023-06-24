import React from 'react';
import CreateShape from './CreateShape.jsx';
import GenerateImages from './GenerateImages.jsx';
import UploadImage from './UploadImage.jsx';

// const BasicControlsContainer = () => (
//   <div className=" basic-controls-container ">
//     <div className="btn-holder columns">
//       <CreateShape />
//       <GenerateImages />
//       <UploadImage />
//     </div>
//   </div>
// );

const BasicControlsContainer = () => (
  <div className=" basic-controls-container ">
    <div className="btn-holder columns">
      <CreateShape />
      <GenerateImages />
      <UploadImage />
    </div>
  </div>
);
export default BasicControlsContainer;
