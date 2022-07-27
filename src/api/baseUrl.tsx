import axios from "axios"
export const request = axios.create({
    baseURL: 'http://dev-api-timesheet.nccsoft.vn'
})