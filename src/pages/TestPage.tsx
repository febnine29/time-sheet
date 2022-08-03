import {Counter} from '../features/counter/Counter';
import { configureStore } from '@reduxjs/toolkit';

interface testProps{
  setIsLogin: (agr :boolean) => void,
  isLogin: boolean;
}
const initialState = { value : 0 }
export default function TestPage(
  {isLogin, setIsLogin}:testProps, 
  state = initialState, 
  // action
  ){
    // const store = configureStore({reducer: counterReducer})
  // if (action.type === 'counter/increment')
  return (
    <Counter />
  )
}