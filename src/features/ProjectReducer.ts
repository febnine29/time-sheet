import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from 'history';
import { RootState } from "../app/store";
import type {TaskFormNewProject} from '../tscript/Project'

interface TaskState{
    tasks: TaskFormNewProject[]
}
const initialState: TaskState ={
    tasks: []
}
const TaskSlice = createSlice({
    name: 'task',
    initialState,  
    reducers:{
        taskAdded:(state, action) =>{
            console.log('action.payload', action.payload)
            state.tasks = [
                ...state.tasks, 
                {taskId: action.payload.taskId, billable: action.payload.billable}]
        }
    }
})
export const {taskAdded} = TaskSlice.actions;
export const taskSelector = (state: RootState) => state.task
export default TaskSlice.reducer