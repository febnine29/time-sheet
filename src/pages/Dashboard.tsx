import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import {PayLoadNewProject} from '../tscript/Project';
import {useSelector} from 'react-redux'
import {taskSelector } from '../features/TasksReducer'


export default function DashBoard() {
  const onSubmit: SubmitHandler<PayLoadNewProject> = data => console.log(data);
  const testData = useSelector(taskSelector)
  console.log('data', testData.tasks)
  
  const { register, handleSubmit } = useForm<PayLoadNewProject>({
    defaultValues: {
      name: "",
      code: "",
      timeStart: "",
      timeEnd: "",
      note: "",
      projectType: 1,
      projectTargetUsers: [],
      customerId: 0,
      isAllUserBelongTo: false,
      tasks: [],
      users: []
      }
  });
  const [task, setTask] = React.useState([] as any)
  const projectName = React.useRef()
  return (
    <Box
    component="form"
    sx={{'& > :not(style)': { m: 1, width: '25ch' },}}
    autoComplete="off"
    >                       
      <TextField  label="Project Name" variant="standard"
        {...register("name")}
      />
      <TextField label="Code" variant="standard" 
        {...register("code")}
      />
      <TextField label="Note" variant="standard"
        {...register("note")}
      />
      <Button onClick={handleSubmit(onSubmit)}>submit</Button>
      </Box>
    
  );
}