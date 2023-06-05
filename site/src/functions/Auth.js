/**
 *
 * @param {FormData} userData email, username, password, picture, picturePath
 * @returns Unparsed response from register
 */
export async function userRegistration(userData) {
  return await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/register`, {
    method: "POST",
    body: userData,
  })
}

/**
 *
 * @param {Object} userInfo User email and password
 * @returns Unparsed response from login
 */
export async function userLogin(userInfo) {
  return await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  })
}
