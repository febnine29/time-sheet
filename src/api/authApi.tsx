import { request } from './baseUrl';
export const loginApi = `${request}/api/TokenAuth/Authenticate`;
export const registerApi = `${request}/api/services/app/Account/Register`;
export const getCurLoginInfoApi = `${request}/api/services/app/Session/GetCurrentLoginInformations`;