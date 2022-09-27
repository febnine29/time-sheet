import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Action } from 'history';
import { RootState } from "../app/store";
import type { dataTaskForm } from '../tscript/Task';

interface confirmState{
    taskConfirm: dataTaskForm
}
const initialState: confirmState = {
    taskConfirm: {
        name: "",
        type: 0,
        isDeleted: false,
        id: 0
    }
}
const confirmTaskSlice = createSlice({
    name: 'confirmTask',
    initialState,
    reducers: {
        dataTaskConfirm:(state,action) => {
            state.taskConfirm = action.payload
            console.log('taskConfirm', state.taskConfirm)
        }
    }
})
export const {dataTaskConfirm} = confirmTaskSlice.actions
export const confirmSelector = (state: RootState) => state.confirmTask
export default confirmTaskSlice.reducer