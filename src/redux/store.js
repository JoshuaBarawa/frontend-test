import { configureStore } from "@reduxjs/toolkit";
import actionReducer from './ActionSlice'
import recordSlice from "./RecordSlice";

export const store = configureStore({

    reducer: {
        action: actionReducer,
        record: recordSlice,
    }

})