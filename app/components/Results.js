import React from "react";
import { battle } from "../utils/api";

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
    return (
      <div>
        <h1>Results</h1>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}
