import axios from 'axios';
interface dataTaskForm {
    name: string;
    type: number;
    isDeleted: boolean;
    id: number;
}
const token = localStorage.getItem('accessToken')
export const getAllTask = axios.create({
    baseURL: 'http://dev-api-timesheet.nccsoft.vn',
    headers: { Authorization: `Bearer ${token}` },
});

export type {dataTaskForm};