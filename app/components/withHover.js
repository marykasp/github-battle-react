import React from "react";

// Higher Order Component (functional component) - is passed a functional component as an argument - returns a new component - renders the original component passed into it
export default function withHover(Component, propName = "hovering") {
  // returns a new component which itself renders the original component passed into it
  return class WithHover extends React.Component {
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
      const props = {
        [propName]: this.state.hovering,
        ...this.props,
      };
      // will be passed all the props that are passed to Tooltip - use spread operator to make sure props get passed down to Tooltip
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...props} />
        </div>
      );
    }
  };
}
