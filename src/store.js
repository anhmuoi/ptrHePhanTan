import objectInfoReducer from '../src/components/ObjectControls/objectSlice.js';
const { configureStore } = require("@reduxjs/toolkit");

const rootReducer = {
    objectInfo: objectInfoReducer,
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;