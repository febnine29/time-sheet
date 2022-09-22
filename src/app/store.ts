import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import taskReducer from '../features/TasksReducer'
import editDataReducer from '../features/DataEditReducer'
import projectReducer from '../features/ProjectReducer'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer,
    project: projectReducer,
    editProject: editDataReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
