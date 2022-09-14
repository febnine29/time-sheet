import {createContext} from 'react'
interface IContext{
    name: string;
    id: number
}
const Context = createContext<IContext | null>(null)

export default Context