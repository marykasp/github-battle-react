import React from 'react'
import PropTypes from 'prop-types';

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
      selectedLanguage: "All"
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }

  // update local state of component - causes a re-render
  updateLanguage (selectedLanguage) {
    this.setState({
      selectedLanguage
    })
  }

  render() {

    return (
      <>
        <LanguagesNav
          selected={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
      </>
    )
  }
}

export default Popular;
