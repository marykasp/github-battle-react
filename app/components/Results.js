import React from "react";
import { battle } from "../utils/api";
import PropTypes from "prop-types";
import Card from "./Card";
import ProfileList from "./ProfileList";
import Loading from "./Loading";

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

  // function is called when component renders for first time - where fetch API calls should go
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
    const { onReset } = this.props;

    if (loading === true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    // UI that renders to display data if no longer loading and if there is no error
    return (
      <>
        <div className="grid space-around container-sm">
          {/* pass down winner and loser github profile information as props to Card component */}
          <Card
            header={winner.score === loser.score ? "Tie" : "Winner"}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            name={winner.profile.login}
            href={winner.profile.html_url}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? "Tie" : "Loser"}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        {/* reset state to null and battle to false when reset button is clicked, invokes function on Battle class component that resets the Battle state*/}
        <button className="btn dark-btn btn-space" onClick={onReset}>
          Reset
        </button>
      </>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.string.isRequired,
  playerTwo: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
};
