import ResponsiveAppbar from './Home-Nav';

interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
function ProjectManager({isLogin, setIsLogin}: LogoutProps){
    console.log('test ProjectManager page')
    return (
        <div className="ProjectManager">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            <h1>Project Manager</h1>
        </div>
    )
}
export default ProjectManager;
