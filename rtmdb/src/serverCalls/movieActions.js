import axios from 'axios';

let server = "http://localhost:8000/api/movie"

export function getUserDashboard(userId) {
    console.log("getUserDashboard");
    return axios.get(`${server}/dashboard/user/${userId}`, { mode: 'CORS' })
        .then(resp => resp.data)
        .catch(error => error.response);
}

export function addFav(dashId) {
    console.log("addFav");
    return axios.get(`${server}/dashboard/${dashId}`, { mode: 'CORS' })
        .then(resp => resp.data)
        .catch(error => error.response);
}

export function getMovieDetails(dashId) {
    console.log("addMovie");
    return axios.get(`${server}/dashDetails/${dashId}`, { mode: 'CORS' })
        .then(resp => resp.data)
        .catch(error => console.log(error));
}