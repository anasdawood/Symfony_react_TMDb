import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {addMovie} from '../serverCalls/movieActions';


class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            userId: '',
            userName: ''
        }
    }

    componentDidMount() {
        const userData = this.getUserData();
        this.setState({
            userId: JSON.parse(userData).id,
            userName: JSON.parse(userData).userName
        })
    }
    getUserData() {

        return localStorage.getItem("userData");
    }

    handleMovieNameChange(e) {
        this.setState({
            movieName: e.target.value
        });
    }

    handleButtonClicked(e) {
        addMovie(this.state.movieName, this.state.userId, this.state.userName)
            .then(resp => console.log(resp))
            .catch(error => error.response);
        console.log(this.state)
    }

    render() {

        return (
            <div className="form-inline">
                <h2>Add Movie</h2>
                <div className="form-group">
                    <input
                        value={this.state.movieName}
                        className="form-control" type="text" placeholder="Movie Name" onChange={this.handleMovieNameChange.bind(this)} />
                    <button
                        className="btn btn-primary" type="button" onClick={this.handleButtonClicked.bind(this)}> Add Movie </button>
                </div>
            </div>
        );
    }
}
export default Create;
