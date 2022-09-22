import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Action } from 'history';
import { RootState } from "../app/store";
import { PayLoadNewProject } from '../tscript/Project';
import axios from 'axios';

interface ProjectState{
    project: PayLoadNewProject
}
export const getSingleProject = createAsyncThunk(
    "project/getSingleProject",
    async (url: string, { dispatch }) => {
        const response = await axios.get(url);
        return response.data;
    }
  );
const initialState:ProjectState = {
    project: {
        name: "",
        code: "",
        status: 0,
        timeStart: "",
        timeEnd: "",
        note: "",
        projectType: 0,
        customerId: 0,
        tasks: [],
        users: [],
        projectTargetUsers: [],
        isAllUserBelongTo: false,
        id: 0,
    }
}
const ProjectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        tasksAdded:(state, action)=>{
            state.project.tasks = action.payload;
            console.log('state.project', action.payload)
        }
    }
})
export const {tasksAdded} = ProjectSlice.actions
export const projectSelector = (state: RootState) => state.project
export default ProjectSlice.reducer