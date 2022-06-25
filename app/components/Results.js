import React from "react";
import { battle } from "../utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser,
} from "react-icons/fa";

// when component first mounts or renders call the battle fetch function - invokes Promise.all fetch requests to returns an object for each player containing profile info and score - since returning Promise.all returns a promise so need to call .then() to get the resolved value of the promise which is an array of objects
export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = this.props;
    // invoke battle function
    battle([playerOne, playerTwo])
      .then((players) => {
        // console.log(`data`, players);
        // update component state
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }
  render() {
    // destructure the state object - winner and loser are both objects with a profile property (object) and a score property (integer)
    const { winner, loser, error, loading } = this.state;

    if (loading === true) {
      return <p>LOADING</p>;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    // UI that renders to display data if no longer loading and if there is no error
    return (
      <div className="grid space-around container-sm">
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? "Tie" : "Winner"}
          </h4>
          <img
            className="avatar"
            src={winner.profile.avatar_url}
            alt={`Avatar for ${winner.profile.login}`}
          />
          <h4 className="center-text">
            Score: {winner.score.toLocaleString()}
          </h4>
          <h2 className="center-text">
            <a className="link" href={winner.profile.html_url}>
              {winner.profile.login}
            </a>
          </h2>
          <ul className="card-list">
            <li>
              <FaUser color="rgba(239, 115, 115)" size={22} />
              {winner.profile.name}
            </li>
            {/* optional list items about winner profile */}
            {winner.profile.location && (
              <li>
                <FaCompass color="rgb(144, 115, 255)" size={22} />
                {winner.profile.location}
              </li>
            )}
            {winner.profile.company && (
              <li>
                <FaBriefcase color="#795548" size={22} />
                {winner.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="rgba(129, 195, 245)" size={22} />
              {winner.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgba(64, 183, 95)" size={22} />
              {winner.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>
        <div className="card bg-light">
          <h4 className="header-lg center-text">
            {winner.score === loser.score ? "Tie" : "Loser"}
          </h4>
          <img
            className="avatar"
            src={loser.profile.avatar_url}
            alt={`Avatar fro ${loser.profile.login}`}
          />
          <h4 className="center-text">Score: {loser.score.toLocaleString()}</h4>
          <h2 className="center-text">
            <a className="link" href={loser.profile.html_url}>
              {loser.profile.login}
            </a>
          </h2>
          <ul className="card-list">
            <li>
              <FaUser color="rgba(239, 115, 115)" size={22} />
              {loser.profile.name}
            </li>
            {/* optional list items about winner profile */}
            {loser.profile.location && (
              <li>
                <FaCompass color="rgb(144, 115, 255)" size={22} />
                {loser.profile.location}
              </li>
            )}
            {loser.profile.company && (
              <li>
                <FaBriefcase color="#795548" size={22} />
                {loser.profile.company}
              </li>
            )}
            <li>
              <FaUsers color="rgba(129, 195, 245)" size={22} />
              {loser.profile.followers.toLocaleString()} followers
            </li>
            <li>
              <FaUserFriends color="rgba(64, 183, 95)" size={22} />
              {loser.profile.following.toLocaleString()} following
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
