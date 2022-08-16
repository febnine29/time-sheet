import axios from "axios";
import { useEffect, useState } from 'react'



export const getToken = () => {
    return localStorage.getItem('accessToken') || null;
}
export const removeUserSession = () => {
    localStorage.removeItem('accessToken');
}


export const setToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setToken;

export const TestMessage = () => {
    return(
        <div className="testMessage">
            <h1>TEST</h1>
        </div>
    )
} 

