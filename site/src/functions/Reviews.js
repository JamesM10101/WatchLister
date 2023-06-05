/**
 * Grabs a review from the database based on the specified document id
 *
 * @param {String} reviewId Document Id for the review being retrieved
 * @returns Unparsed result from getReview
 */
export async function getReviewById(reviewId) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/reviews/getReview/${reviewId}`
  )
}

/**
 *
 * @param {String} userId Docuemnt Id for the user creating the review
 * @param {String} token Users JWT token
 * @param {String} movieId Document Id for the movie being reviewed
 * @param {Object} reviewData Object containing the reviews title, rating, and description
 * @returns Unparsed response from reviews create method
 */
export async function createReview(userId, token, movieId, reviewData) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/reviews/${movieId}/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: userId,
      },
      body: JSON.stringify(reviewData),
    }
  )
}

/**
 * Edits an existing review using the new reviewData for the specified reviewId
 *
 * @param {String} userId Document Id for the user editing the review
 * @param {String} token Users JWT token
 * @param {String} reviewId Document Id for the review to be edited
 * @param {Object} reviewData Object containing the reviews title, rating, and description
 * @returns Unparsed response from Reviews edit method
 */
export async function editReview(userId, token, reviewId, reviewData) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/reviews/${reviewId}/edit`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: userId,
      },
      body: JSON.stringify(reviewData),
    }
  )
}

/**
 * Likes or dislikes a review based on the request type specified
 *
 * @param {String} userId Document Id for the user editing the review
 * @param {String} token Users JWT token
 * @param {String} reviewId Document Id of the review to like/dislike
 * @param {String} requestType "like" or "dislike"
 * @returns Unparsed data from the reviews like or dislike method
 */
export async function toggleLikeDislikeById(
  userId,
  token,
  reviewId,
  requestType
) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/reviews/${reviewId}/${requestType}`,
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

/**
 * Deletes a review from the database
 *
 * @param {String} userId Document Id for the user editing the review
 * @param {String} token Users JWT token
 * @param {String} reviewId Document id of the review to delete
 * @returns Unparsed data from reviews delete method
 */
export async function deleteReviewById(userId, token, reviewId) {
  return await fetch(
    `${process.env.REACT_APP_BACKEND_ADDRESS}/reviews/${reviewId}/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        userId: userId,
      },
    }
  )
}
