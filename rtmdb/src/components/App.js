import React, { Component } from 'react';
import { Link } from 'react-router';
import { getUserDashboard, addFav } from '../serverCalls/movieActions';
import { browserHistory } from 'react-router';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieName: '',
      myDashboard: [],
      originalDashboard: []
    };
  };

  handleMovieNameChange(e) {
    if (e.target.value === "") {
      this.setState({ myDashboard: this.state.originalDashboard });
    }
    this.setState({
      movieName: e.target.value
    });
  }

  handleButtonClicked(e) {
    let myDashboard = this.state.myDashboard.filter((movie) => {
      let name = this.state.movieName;
      return movie.title.includes(name);
    });
    this.setState({ myDashboard: myDashboard });
  }

  addFav(id, index) {
    addFav(id)
      .then((data) => {
        let myDashboard = this.state.myDashboard;
        myDashboard[index].fav = data.fav;
        this.setState({ myDashboard: myDashboard });
      })
      .catch((err) => {
        console.error('err', err);
      });
  }


  componentDidMount() {
    const userData = this.getUserData();
    getUserDashboard(JSON.parse(userData).id).then((data) => {
      this.setState({
        myDashboard: data,
        originalDashboard: data
      });
      console.log(this.state.myDashboard);
    }
    ).catch((err) => {
      console.error('err', err);
    });
  }
  getUserData() {
    let userData = localStorage.getItem("userData");
    if(userData == null)
    {
      browserHistory.push("/signin");
    }
    else{

      return userData;

    }
    
  }

  render() {

    return (
      <div>
        <div className="form-inline">
          <div className="form-group">
            <input
              value={this.state.movieName}
              className="form-control" type="text" placeholder="Movie Name" onChange={this.handleMovieNameChange.bind(this)} />
            <button
              className="btn btn-primary" type="button" onClick={this.handleButtonClicked.bind(this)}> Search Movie </button>
          </div>
        </div>
        <table className="table table-hover table-responsive">
          <thead>
            <tr>
              <th>id</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Description</th>
              <th>Cover</th>
              <th>Fav</th>
            </tr>
          </thead>
          <tbody>
            {this.state.myDashboard && this.state.myDashboard.map((movie, i) => {
              return (
                <tr key={movie.id}>
                  <td>{movie.id}</td>
                  <td>{movie.title}</td>
                  <td>{movie.rating}</td>
                  <td>{movie.movieDescription}</td>
                  <td><img src={`http://image.tmdb.org/t/p/w185${movie.coverImage}`} /></td>
                  <td><img style={{ width: '50px', height: '50px' }} src={`../../${movie.fav}.png`} /></td>
                  <td>
                    <Link to={`/movie/details/${movie.id}`} className="btn btn-default btn-sm">Details</Link>
                    <button onClick={this.addFav.bind(this, movie.id, i)} className="btn btn-danger btn-sm">+</button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
        {/* <button onClick={this.getNextMovies.bind(this)} className="btn btn-default">Next</button> */}
      </div>
    );
  }
}

export default App;
