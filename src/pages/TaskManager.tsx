import ResponsiveAppbar from './Home-Nav';

interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
function TaskManager({isLogin, setIsLogin}: LogoutProps){
    console.log('test TaskManager page')
    return (
        <div className="TaskManager">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>

            
        </div>
    )
}
export default TaskManager;
