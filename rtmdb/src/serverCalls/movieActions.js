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

export function addMovie(movieName, userId, userName) {
    console.log("addMovie");
    let request = { movieName: movieName, userId: userId, userName: userName };
    return axios.post(`${server}/addMovie`, JSON.stringify(request), { mode: 'CORS' })
        .then(resp => resp)
        .catch(error => alert(error.response.data.message));
}