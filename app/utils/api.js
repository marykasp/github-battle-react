// export function fetchPopularRepos(language) {
//   const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

//   return fetch(endpoint)
//     .then((res) => res.json())
//     .then((data) => {
//       if(!data.items) {
//         throw new Error(data.message)
//       }

//       // return an array of objects
//       return data.items
//     })
// }

export async function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

  const response = await fetch(endpoint)
  const data = await response.json()

  if(!data.items) {
    throw new Error(data.message)
  }

  return data.items
}
