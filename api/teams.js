const endpoint = 'https://team-roster-nss-default-rtdb.firebaseio.com/';

const createNewTeam = (payload) => new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateTeam = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

export const getUserTeams = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/teams.json?orderBy="userID"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export { createNewTeam, updateTeam };
