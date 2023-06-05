/**
 * Grabs the specified user from the database
 *
 * @param {String} userId Document Id for the user
 * @returns Unparsed data from getUser
 */
export async function getUserById(userId) {
  return await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`)
}

/**
 * Edits the specified users profile
 *
 * @param {String} userId Document Id for the user
 * @param {String} token Users JWT token
 * @param {Object} profileInfo Object containing the users new email and username
 * @returns Unparsed data from updateUser
 */
export async function editProfile(userId, token, profileInfo) {
  return fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}/update`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: userId,
      },
      body: JSON.stringify(profileInfo),
    }
  )
}

/**
 * Saved or unsaves the movie for the specified user
 *
 * @param {String} userId Document Id for the user
 * @param {String} token Users JWT token
 * @param {String} movieId Document Id for the movie to save
 * @returns Unparsed data from toggleSaveMovie
 */
export async function toggleSaveMovie(userId, token, movieId) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${movieId}/saveMovie`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: userId,
      },
    }
  )
}
