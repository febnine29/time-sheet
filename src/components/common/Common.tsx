import axios from "axios";
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}
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