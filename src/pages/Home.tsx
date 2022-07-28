import {Link} from 'react-router-dom'
function Home(){
    
    return(
        <div className="Home">
            <h1>Home</h1>
            <ul>
                <li><Link to='/Login'>Login</Link></li>
                <li><Link to='/Home'>Home</Link></li>
                <li><Link to='/Dashboard'>Dashboard</Link></li>
            </ul>
        </div>
    )
}
export default Home