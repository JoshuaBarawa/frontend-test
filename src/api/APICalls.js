
import axios from "axios";
import { actionStart, actionSuccess, actionFailed } from "../redux/ActionSlice";


export const getAllRecords = async (dispatch) => {
    dispatch(actionStart())
    try {
        const resp =  await axios.get(process.env.REACT_APP_BASE_URL, {
            headers: {
                'content-type': 'application/json',
                'X-API-key': process.env.REACT_APP_API_KEY
            }
        })
        dispatch(actionSuccess())
        return resp
    } catch (err) {
        dispatch(actionFailed())
        return err
    }
}


export const editRecord = async (id, record, dispatch) => {
    dispatch(actionStart())
    try {
        const resp = await axios.patch(process.env.REACT_APP_BASE_URL+ `/${id}`, record, {
            headers: {
                'content-type': 'application/json',
                'X-API-key': process.env.REACT_APP_API_KEY
            }
        });
        dispatch(actionSuccess())
        return resp
    } catch (err) {
        dispatch(actionFailed())
        return err
    }
}
