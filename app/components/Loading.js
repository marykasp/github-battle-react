import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
  },
};

export default class Loading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.text,
    };
  }

  // Executes once the component first mounts
  componentDidMount() {
    const { text, speed } = this.props;
    // setInterval method returns an ID that you can then us to stop the method from executing
    this.interval = window.setInterval(() => {
      this.state.content === text + "..."
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + "." }));
    }, speed);
  }

  // remove interval when component unmounts so code will stop executing (memory leak)
  componentWillUnmount() {
    // pass clearInterval the id of the setInterval method that you want to clear
    window.clearInterval(this.interval);
  }

  // executes after construction f(x) - initial display of what UI looks like
  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};

// static property - for a functional component default props can be set in the function definition as default parameters - will be used if no value is passed in when function is invoked
Loading.defaultProps = {
  text: "Loading",
  speed: 300,
};
