import React, { Component } from 'react';
import { getMovieDetails } from '../serverCalls/movieActions';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: [],
      allGenre: {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western"
      },
      userGenre: ""
    };
  };

  componentDidMount() {
    let userData = this.getUserData();
    getMovieDetails(this.props.params.dashId
    ).then((data) => {
      this.setState({ details: data });
      var res = this.state.details.genreIds.split(",");
      let userGenre = "";
      for (var i = 0; i < res.length; i++) {
        userGenre += this.state.allGenre[res[i]]+",";
      }
      this.setState({ userGenre: userGenre });
    })
      .catch((err) => {
        console.error('err', err);
      });
  }

  getUserData() {
    let userData = localStorage.getItem("userData");
    if (userData == null) {
      browserHistory.push("/signin");
    }
    else {
      return userData;
    }
  }
  getUserData() {
    let userData = localStorage.getItem("userData");
    if (userData == null) {
      browserHistory.push("/signin");
    }
    return userData;
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <img src={`http://image.tmdb.org/t/p/w780${this.state.details.coverImage}`} />
          </div>
          <div className="col-sm-3">
            <label >Adult : </label>
            <label className="label label-default">{String(this.state.details.adult)}</label>
            <br />
            <label >Genre: </label>
            <label className="label label-default">{this.state.userGenre}</label>
            <br />
            <label >Rating: </label>
            <label className="label label-default">{this.state.details.rating * 10}%</label>
            <br />
            <label >Description: </label>
            <label>{this.state.details.movieDescription}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;