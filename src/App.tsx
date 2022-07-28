import React, {useEffect, useState, useRef,useLayoutEffect} from 'react';
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import axios from 'axios'
import { request } from './api/baseUrl'
import './App.css';
import Login from './components/auth/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import useToken from './components/auth/useToken'
import { LoginData } from './tscript/Auth';
import setToken, { getToken} from './components/common/Common'
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>

function App() {
  console.log('first load')
  
  const [isLogin, setIsLogin] = useState(false)
  const [authLoading, setAuthLoading] = useState(true);

  console.log('isLogin: ',isLogin)
  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');
    setToken(token)
    console.log('settoken', setToken(token))
    if(!token){
      return
    }
    request.get('/api/services/app/Session/GetCurrentLoginInformations')
    .then(response => {
      setIsLogin(true);
      setAuthLoading(false);
    })
    .catch(error => {
      setIsLogin(false);
      setToken(null);
      setAuthLoading(false);
    })
  }, [])

  if (authLoading && getToken() && !isLogin) {
    return (
      <div className="content">Checking Authentication...</div>
    ) 
  }

  return (
    <div className="App">
      
     
      <Routes>
        <Route path='/Login' element={<Login setIsLogin={setIsLogin} isLogin={isLogin} />}></Route>
        <Route path='Home'
          element={
            <ProtectedRoute isLogin={isLogin}> 
              <Home isLogin={isLogin} setIsLogin={setIsLogin}/>
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
