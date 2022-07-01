import React from "react";
import ReactDOM from "react-dom";
import Popular from "./components/Popular";
import "./index.css";
import Battle from "./components/Battle";
import Nav from "./components/Nav";
import { ThemeProvider } from "./contexts/theme";

// React Component - manages own state, lifecycle methods, renders/returns a React Element (JSX describes what UI looks like)
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "light",
      // add a function that invokes setState on the state itself - passed down in an object to context consumers
      toggleTheme: () => {
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }
  render() {
    // JSX - syntax extension of JS
    return (
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className="container">
            <Nav />
            <Popular />
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

// Class components return a JSX React element, second argument is where to render the element to
ReactDOM.render(<App />, document.getElementById("app"));
