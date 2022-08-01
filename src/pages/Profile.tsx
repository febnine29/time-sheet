import ResponsiveAppbar from './Home-Nav';

interface LogoutProps{
    setIsLogin: (agr :boolean) => void,
    isLogin: boolean
}
function Profile({isLogin, setIsLogin}: LogoutProps){
    return (
        <div className="Profile">
            <ResponsiveAppbar isLogin={isLogin} setIsLogin={setIsLogin}/>
            
            <h1>Profile</h1>
        </div>
    )
}
export default Profile;








