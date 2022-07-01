import React from "react";
import ReactDOM from "react-dom";
import Popular from "./components/Popular";
import Battle from "./components/Battle";
import Nav from "./components/Nav";
import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      // Router will pass information to child components about the route
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <Route exact path="/" component={Popular} />
              <Route path="/battle" component={Battle} />
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

// Class components return a JSX React element, second argument is where to render the element to
ReactDOM.render(<App />, document.getElementById("app"));
