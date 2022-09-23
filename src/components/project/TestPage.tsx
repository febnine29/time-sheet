import React from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {dataTaskForm} from '../../tscript/Task'
import { getAllTask } from '../../tscript/Task';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function TestPage() {
  const { register, handleSubmit } = useForm<dataTaskForm>();
  const onSubmit: SubmitHandler<dataTaskForm> = data => {
    getAllTask.post(`/api/services/app/Task/Save`, data)
    .then(response =>{
      console.log(response);
    })
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
      
    // <form onSubmit={handleSubmit(onSubmit)}>
    <FormControl>
      <TextField
        autoFocus
        variant='standard'
        label='Input task name'
        {...register("name")}
          
      />
      <span style={{textAlign: 'left', margin: '15px 0px 10px 0px'}}>Select task type</span>
      <Select
        autoWidth
        variant="standard"
        {...register("type")}
      >
        <MenuItem  value="0">Common Task</MenuItem>
        <MenuItem  value="1">Other Task</MenuItem>
          
      </Select>
      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </FormControl>
    // </form>
    
  );
}