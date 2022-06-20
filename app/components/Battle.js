import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy, FaUser } from "react-icons/fa";
import PropTypes from "prop-types";

function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ul className="grid container-sm center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            className="bg-light"
            color="rgb(255, 191, 116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className="bg-light" color="rgb(255, 215, 0)" size={140} />
        </li>
      </ul>
    </div>
  );
}

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
    // bind this keyword to referencce this componnent
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // passs the state to a function on Battle component
    this.props.onSubmit(this.state.username);
  }

  // updates the state of the PlayerInput component - changinng the value of the input field text
  handleChange(event) {
    // updates local state, causes re-render, input field is updated
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="column player">
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn dark-btn"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOne: null,
      playerTwo: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, player) {
    this.setState({
      [id]: player,
    });
  }

  render() {
    const { playerOne, playerTwo } = this.state;
    return (
      <>
        <Instructions />
        <div className="players-container">
          <h1 className="center-texgt header-lg">Players</h1>
          <div className="row space-around">
            {/* render player input components */}
            {playerOne === null && (
              <PlayerInput
                label="Player One"
                onSubmit={(player) => this.handleSubmit("playerOne", player)}
              />
            )}
            {playerTwo === null && (
              <PlayerInput
                label="Player Two"
                onSubmit={(player) => this.handleSubmit("playerTwo", player)}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
