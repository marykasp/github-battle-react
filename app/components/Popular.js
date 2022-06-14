import React from 'react'
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

// Functional Component - without Hooks can be used to be passed props and render a UI component
function LanguagesNav({ selected, updateLanguage}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='flex-center'>
      {/* map over the languages array and create a list item for each */}
    {languages.map((language) => (
      <li key={language}>
        <button
          className='btn-clear nav-link'
          style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
          onClick={() => updateLanguage(language)}>
          {language}
        </button>
      </li>
    ))}
  </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

// Class Component
class Popular extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedLanguage: "All",
      repos: null,
      error: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this)
  }

  // will invoke the fetch request once teh component mounts
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  // update local state of component - causes a re-render
  updateLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage,
      repos: null,
      error: null
    })

    // make fetch request to Github API - returns an array of objects
    fetchPopularRepos(selectedLanguage)
      .then((repos) => this.setState({
        repos,
        error: null
      }))
      .catch(() => {
        console.warn('Error fetching repos:', error)

        this.setState({
          error: 'There was an error fetching repositories'
        })
      })
  }

  isLoading() {
    return this.state.repos === null
  }

  render() {
    const {selectedLanguage, repos, error} = this.state
    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          updateLanguage={this.updateLanguage}
        />

        {/* if the repos state is empty render this UI */}
        {this.isLoading() && <p>Loading...</p>}

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </>
    )
  }
}

export default Popular;
