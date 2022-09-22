import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import {PayLoadNewProject} from '../../tscript/Project';
import {useSelector} from 'react-redux'
import {taskSelector } from '../../features/TasksReducer'


export default function TestPage() {
  const onSubmit: SubmitHandler<PayLoadNewProject> = data => console.log(data);
  const taskData = useSelector(taskSelector)
  React.useEffect(() => {
    console.log('data', taskData.tasks)

  },[taskData.tasks])
  const { register, handleSubmit, setValue } = useForm<PayLoadNewProject>({
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