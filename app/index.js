import React from "react";
import ReactDOM from "react-dom";
import Popular from "./components/Popular";
import "./index.css";
import Battle from "./components/Battle";

// React Component - manages own state, lifecycle methods, renders/returns a React Element (JSX describes what UI looks like)
class App extends React.Component {
  render() {
    // JSX - syntax extension of JS
    return (
      <div className="container">
        <Battle />
      </div>
    );
  }
}

// Class components return a JSX React element, second argument is where to render the element to
ReactDOM.render(<App />, document.getElementById("app"));
