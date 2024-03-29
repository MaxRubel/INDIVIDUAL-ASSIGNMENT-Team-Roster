import TeamView from '../components/TeamView';
import React from 'react';
import PropTypes from 'prop-types';

function Home({ searchInput }) {
  return (
    <div>
      <h1 style={{ color: 'white', caretColor: 'transparent' }}>Teams</h1>
      <TeamView searchInput={searchInput} />
    </div>
  );
}

export default Home;

Home.propTypes = {
  searchInput: PropTypes.string,
};

// Set default props for PlayerForm
Home.defaultProps = {
  searchInput: '',
};
