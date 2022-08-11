import axios from "axios"
export const request = axios.create({
    baseURL: 'http://dev-api-timesheet.nccsoft.vn'
})

const token = localStorage.getItem('accessToken')

export const authRequest = axios.create({
    baseURL: 'http://dev-api-timesheet.nccsoft.vn',
    headers: { Authorization: `Bearer ${token}` },
});