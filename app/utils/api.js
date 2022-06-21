export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  // if not passing in data directly to a function that will render UI then need to return the resolved data from the fetch method
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      // return an array of objects
      return data.items;
    });
}

const id = "4adb2389d060317ac9cf";
const secret = "32067f9fcf5cb6a1a787112bf74f9763ef404c03";
const params = `?client_id=${id}&client_secret=${secret}`;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }

  return message;
}

// get profile of user
function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile; // will return a promise in Promise.all call
    });
}

// get repos of user
function getRepos(username) {
  // returns a promise that is resolved into repos data
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100/`
  )
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos;
    });
}

// for each repo in repos array the callback function is invoked count will be what the previous callback function returns - its initial value is 0: add up all of the stars in each repo of the user
function getStarcount(repos) {
  return repos.reduce((count, { stargazers_count }) => {
    // reduces an array downn to a single value - sum or product of values in an array
    return count + stargazers_count;
  }, 0);
}

function calculateScore(followers, repos) {
  //calculate score to battle two github users
  return followers * 3 + getStarcount(repos);
}

// invoke both fetch requests
function getUserData(player) {
  // returns a promise, call then with a callback that takes an array of resolved promise data and implicit return an object with profile data and score
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

// is passed an array of players - use index position to pass each player as an argument to getUserData function that invokes a Promise.all fetch request
export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    (results) => sortPlayers(results)
  );
}

// export default async function fetchPopularRepos(language) {
//   const endpoint = window.encodeURI(
//     `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
//   );

//   const response = await fetch(endpoint);
//   const data = await response.json();

//   if (!data.items) {
//     throw new Error(data.message);
//   }

//   return data.items;
// }
