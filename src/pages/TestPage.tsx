import {Counter} from '../features/counter/Counter'
interface testProps{
  setIsLogin: (agr :boolean) => void,
  isLogin: boolean
}
const initialState = { value : 0 }
export default function TestPage(
  {isLogin, setIsLogin}:testProps, 
  // state = initialState, 
  // action:any
  ){
  // if (action.type === 'counter/increment')
  return (
    <Counter />
  )
}