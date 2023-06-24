import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    objectInfo: {
        opacity: 1,
        fill: 'rgba(0,0,0,0)',
        tagColor: '#f44336',
    },
};

const objectSlice = createSlice({
    name: 'objectInfo',
    initialState,
    reducers: {
        getCurrenObjectInfo: (state, action) => {
            console.log(action.payload);
            state.objectInfo.opacity = action.payload.opacity;
            state.objectInfo.fill = action.payload.fill;
            state.objectInfo.tagColor = action.payload.tagColor;
        },
    },
});

export const { getCurrenObjectInfo } = objectSlice.actions;
export default objectSlice.reducer;
