import React from "react";

export default class Results extends React.Component {
  render() {
    return (
      <div>
        <h1>Results</h1>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}
