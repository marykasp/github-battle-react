import React from "react";

// Render props
export default class Hover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovering: false,
    };

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver() {
    this.setState({
      hovering: true,
    });
  }

  mouseOut() {
    this.setState({
      hovering: false,
    });
  }

  render() {
    console.log("props", this.props);
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {/* has a child prop that is a function - invoke function and pass it state */}
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
