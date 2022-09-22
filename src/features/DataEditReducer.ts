import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action } from 'history';
import { RootState } from "../app/store";
import { PayLoadNewProject } from '../tscript/Project';

interface ProjectState{
    project: PayLoadNewProject[];
}

const initialState: ProjectState = {
    project: []
}
const ProjectSlice = createSlice({
    name: 'editProject',
    initialState,
    reducers: {
        DataEdit:(state, action) => {
            state.project = action.payload
        }
    }
})
export const {DataEdit} = ProjectSlice.actions;
export const projectSelector = (state: RootState) => state.editProject
export default ProjectSlice.reducer