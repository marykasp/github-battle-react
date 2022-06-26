import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./Loading";

// Functional Component - without Hooks can be used to be passed props and render a UI component
function LanguagesNav({ selected, updateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];
  /* map over the languages array and create a list item for each */
  let languageItem = languages.map((language) => {
    return (
      <li key={language}>
        <button
          className="btn-clear nav-link"
          style={language === selected ? { color: "rgb(187, 46, 31)" } : null}
          onClick={() => updateLanguage(language)}
        >
          {language}
        </button>
      </li>
    );
  });
  return <ul className="flex-center">{languageItem}</ul>;
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};

// Functional Component - display grid for repositories
function ReposGrid({ repos }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } =
          repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              name={login}
              href={html_url}
            >
              <ul className="card-list">
                <li>
                  <FaUser color="rgb(255,191,116)" size={22} />
                  <a href={`https://github.com/${login}`}>{login}</a>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

// Class Component
class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      // repos is an object with the selected language as keys point to the array of repos returned from the fetch request
      repos: {},
      error: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  // will invoke the fetch request once teh component mounts
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  // update local state of component - causes a re-render
  updateLanguage(selectedLanguage) {
    // only need to set the language and error state
    this.setState({
      selectedLanguage,
      error: null,
    });

    // only fetch repos if repos does not have that language property
    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          // use previous data on repos state object - pass this.setState a callback function
          this.setState(({ repos }) => ({
            repos: {
              // pass in all the properties of the repos object
              ...repos,
              // dynamic setting of a new key:value pair - key is the language, data is the array of repos returned from fetch request
              [selectedLanguage]: data,
            },
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos:", error);

          this.setState({
            error: "There was an error fetching repositories",
          });
        });
      // make fetch request to Github API - returns an array of objects
    }
  }

  // funnctionn that will determine whether fetching is still occurring
  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />

        {/* if the repos state is empty render this UI */}
        {this.isLoading() && <Loading text="Fetching Repos" />}

        {error && <p className="center-text error">{error}</p>}

        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </>
    );
  }
}

export default Popular;
