import axios from 'axios';

let server = "http://localhost:8000/api/user"

export function registerUser(userData) {
    console.log("registerUser");
    return axios.post(`${server}/create`, JSON.stringify(userData), { mode: 'CORS' })
        .then(resp => resp.data)
        .catch(error => error.response);
}

export function logIn(userData) {
    console.log("logIn");
    return axios.post(`${server}/isUserExist`, JSON.stringify(userData), { mode: 'CORS' })
        .then(resp => {
            let data = { "status": resp.status, "data": resp.data };
            return data;
        })
        .catch(error => {
            let data = { "status": error.response.status, "data": error.response.data };
            return data;
        });
}