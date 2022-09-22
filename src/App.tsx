import React, {useEffect, useState, useRef,useLayoutEffect} from 'react';
import {Routes, Route, Link, Navigate} from 'react-router-dom';
import axios from 'axios'
import { request } from './api/baseUrl'
import './App.css';
import Login from './components/auth/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProjectManager from './pages/ProjectManager';
import TaskManager from './pages/TaskManager';
import TestPage from './components/project/TestPage';
import ProtectedRoute from './routes/ProtectedRoute';
import useToken from './components/auth/useToken'
import { LoginData } from './tscript/Auth';
import setToken, { getToken} from './components/common/Common';
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
// interface appProps{
//   titles: dataTaskForm[] | null;
// }
function App() {
  
  const [isLogin, setIsLogin] = useState(false)
  const [authLoading, setAuthLoading] = useState(true);

  useLayoutEffect(() => {
    const token = localStorage.getItem('accessToken');
    setToken(token)
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
      <div className="content" style={{width: '60vw', height: '20vh', margin: '30vh auto', fontSize: '30px', fontWeight: 'bold', textAlign: 'center'}}>
        Checking Authentication...
      </div>
    ) 
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setIsLogin={setIsLogin} isLogin={isLogin} />}></Route>
        <Route path='home'
          element={
            <ProtectedRoute isLogin={isLogin}> 
              <Home isLogin={isLogin} setIsLogin={setIsLogin}/>
            </ProtectedRoute> 
          }> 
          
        </Route>
        <Route 
          path='home/profile' 
          element={
            <ProtectedRoute isLogin={isLogin}>
              <Profile isLogin={isLogin} setIsLogin={setIsLogin}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='home/task-manager' 
          element={
            <ProtectedRoute isLogin={isLogin}>
              <TaskManager isLogin={isLogin} setIsLogin={setIsLogin}/>
            </ProtectedRoute>
          }
        />
        <Route 
          path='home/project-manager' 
          element={
            <ProtectedRoute isLogin={isLogin}>
              <ProjectManager isLogin={isLogin} setIsLogin={setIsLogin}/>
            </ProtectedRoute>
          }
        />
        <Route path='Dashboard'
          element={
            <ProtectedRoute isLogin={isLogin}> 
              <Dashboard />
            </ProtectedRoute> 
          }> 
        </Route>
        <Route path='/test-page' element={<TestPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
