import React, { Component } from 'react';
import { getMovieDetails } from '../serverCalls/movieActions';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      details: []
    };
  };

  componentDidMount() {
    let userData = this.getUserData();
    getMovieDetails(this.props.params.dashId
    ).then((data) => {
      this.setState({ details: data });
      console.log(data);
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
            <label className="label label-default">{this.state.details.genreIds}</label>
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