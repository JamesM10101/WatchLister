import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req, res) => {
  try {
    // new user data
    const { username, email, password, picturePath } = req.body

    // password encryption (salt and hash)
    const passwordHash = await bcrypt.hash(password, 15)

    // create the new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      picturePath,
      savedMovies: [],
      reviews: [],
      likes: {},
      admin: false,
    })
    const savedUser = await newUser.save()

    // return the user
    res.status(201).json(savedUser)
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // get user with email
    const user = await User.findOne({ email: email })

    // user doesnt exist
    if (!user) return res.status(400).json({ error: "User does not exist." })

    // check if the passwords match
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: "Invalid Credentials" })

    // sign the jwt token & delete the password
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET + user.id)
    user.password = undefined

    // return the user and signed token
    res.status(200).json({ token, user })
  } catch (err) {
    // return the error message
    res.status(500).json({ error: err.message })
  }
}
