import TeamView from '../components/TeamView';
import React from 'react';
import PropTypes from 'prop-types';
export default function TeamPage({ searchInput }) {
  return (
    <>
      <h1 style={{ color: 'white', caretColor: 'transparent' }}>Teams</h1>
      <TeamView searchInput={searchInput} />;
    </>
  );
}
TeamPage.propTypes = {
  searchInput: PropTypes.string,
};

// Set default props for PlayerForm
TeamPage.defaultProps = {
  searchInput: '',
};
