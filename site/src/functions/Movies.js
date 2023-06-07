/**
 * Grabs the movie from the database based on the specified document id
 *
 * @param {String} movieId Document id for the movie
 * @returns Unparsed response from getMovie
 */
export async function getMovieById(movieId) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/getMovie/${movieId}`
  )
}

/**
 * Grabs movies from the database based on the specified title
 *
 * @param {String} title Movie title to search
 * @returns Unparsed response from searchByTitle
 */
export async function searchMoviesByTitle(title) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/${title}/searchByTitle`
  )
}

/**
 * Grabs the highest rated movies from the database
 *
 * @returns Unparsed result from highestRated
 */
export async function getHighestRated() {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/highestRated`
  )
}

/**
 * Grabs the recently added movies from the database
 *
 * @returns Unparsed result from recentlyAdded
 */
export async function getRecentlyAdded() {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/recentlyAdded`
  )
}

/**
 * Grabs the recently released movies from the database
 *
 * @returns Unparsed result from recentReleases
 */
export async function getRecentlyReleased() {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/recentReleases`
  )
}

/**
 * Grabs random movies from the database
 *
 * @returns Unparsed result from random
 */
export async function getRandom() {
  return await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/movies/random`)
}
