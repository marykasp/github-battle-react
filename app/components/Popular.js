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
      // repos is an object with the selected language as keys point to the array of repos returned from the fetch request
      repos: {},
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
    // only need to set the language and error state
    this.setState({
      selectedLanguage,
      error: null
    })

    // only fetch repos if repos does not have that language property
    if(!this.state.repos[selectedLanguage]) {

      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          // use previous data on repos state object - pass this.setState a callback function
          this.setState(({repos}) => ({
            repos: {
              // pass in all the properties of the repos object
              ...repos,
              // dynamic setting of a new key:value pair - key is the language, data is the array of repos returned from fetch request
              [selectedLanguage]: data
            }
          }))
        })
        .catch(() => {
          console.warn('Error fetching repos:', error)

          this.setState({
            error: 'There was an error fetching repositories'
          })
        })
      // make fetch request to Github API - returns an array of objects

    }

  }

  isLoading() {
    const {selectedLanguage, repos, error} = this.state;
    return !repos[selectedLanguage] && error === null
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

        {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
      </>
    )
  }
}

export default Popular;
