import { createSlice } from "@reduxjs/toolkit";

export const RecordSlice = createSlice({
    name: 'record',
    initialState: {

        allRecords: [],
        record: null,
    },
    reducers: {

        setAllRecords: (state, action) => {
            state.allRecords = action.payload
        },
        setRecord: (state, action) => {
            state.record = action.payload
        },
        
       
        
    },

})

export const { setAllRecords, setRecord} = RecordSlice.actions
export default RecordSlice.reducer