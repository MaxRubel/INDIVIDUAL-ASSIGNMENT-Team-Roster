import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPlayersOfteam } from '../api/players';
import PlayerCard from './PlayerCard';
import { getUserTeams } from '../api/teams';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default function TeamView({ searchInput }) {
  const { user } = useAuth();
  // const [teams, setTeams] = useState([]);
  const [teamArray, setTeamArray] = useState([]);
  const compiledTeams = useRef([]);

  useEffect(() => {
    getUserTeams(user.uid).then((teamsArr) => {
      Promise.all(
        teamsArr.map((team) =>
          getPlayersOfteam(team.firebaseKey).then((players) => ({
            teamName: team.team_name,
            players,
            firebaseKey: team.firebaseKey,
          }))
        )
      ).then((teams) => {
        compiledTeams.current = teams;
        setTeamArray(teams);
      });
    });
  }, []);

  useEffect(() => {
    if (searchInput.length === 0) {
      setTeamArray(compiledTeams.current);
    }
    if (searchInput.length > 0) {
      const teamFilter = compiledTeams.current
        .filter((team) =>
          team.players.some((player) =>
            player.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        )
        .map((team) => ({
          ...team,
          players: team.players.filter((player) =>
            player.name.toLowerCase().includes(searchInput.toLowerCase())
          ),
        }));

      setTeamArray(teamFilter);
    }
  }, [searchInput]);

  if (teamArray.length > 0) {
    return (
      <div>
        {teamArray.map((team) => (
          <div key={team.firebaseKey}>
            <h2
              key={`header--${team.firebaseKey}`}
              style={{ marginTop: '4%', color: 'white' }}
            >
              {team.teamName}
            </h2>
            <div
              key={`div-1--${team.firebaseKey}`}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2%',
              }}
            >
              {team.players.map((player) => (
                <PlayerCard key={player.firebaseKey} playerObj={player} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <Loading />;
  }
}

TeamView.propTypes = {
  searchInput: PropTypes.string,
};

// Set default props for TeamView
TeamView.defaultProps = {
  searchInput: '', // Provide a default value for searchInput
};
