const endpoint = 'https://team-roster-nss-default-rtdb.firebaseio.com/';

const getOrders = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/team.json`, {
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
