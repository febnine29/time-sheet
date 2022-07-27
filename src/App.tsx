import React, {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import axios from 'axios'
import { request } from './api/baseUrl'
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Login from './components/auth/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import useToken from './components/auth/useToken'
import { LoginData } from './tscript/Auth';
import setToken, { getToken} from './components/common/Common'
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
// const ProtectedRoute: FC = ({ children }) => {
//   const { user } = useContext(ContextProvider); //Auth context
//   return user?.id ? ( //Check if logged in
//     <>
//       {children} //This is your children
//       <Outlet /> //This is your nested route
//     </>
//   ) : (
//     <Navigate to="/login" replace /> //Go back to login if not logged in
//   );
// };

function App() {
  const [isLogin, setIsLogin] = useState(false)
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setToken(token)
    if(!token){
      return
    }
    request.get('/api/services/app/Session/GetCurrentLoginInformations')
    .then(response => {
      console.log('response common:', axios.defaults.headers.common);
      
      setIsLogin(true)
    })
    .catch(error => {
      setIsLogin(false);
      setToken(null)
    })
  }, [])
  console.log('isLogin: ',isLogin)


  return (
    <div className="App">
      <ul>
        <li><Link to='/Login'>Login</Link></li>
        <li><Link to='/Profile'>Profile</Link></li>
        <li><Link to='/Dashboard'>Dashboard</Link></li>
      </ul>
     
      <Routes>
        <Route path='/Login' element={<Login setIsLogin={setIsLogin} />}></Route>
        <Route path='Profile'
          element={
            <ProtectedRoute isLogin={isLogin}> 
              <Profile />
            </ProtectedRoute> 
          }> 
        </Route>
        <Route path='Dashboard'
          element={
            <ProtectedRoute isLogin={isLogin}> 
              <Dashboard />
            </ProtectedRoute> 
          }> 
        </Route>
      </Routes>
     
    </div>
  );
}

export default App;
