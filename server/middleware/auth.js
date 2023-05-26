import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const verifyToken = async (req, res, next) => {
  try {
    // grab the auth header from frontend
    let token = req.header("Authorization")
    const { userId } = req.body

    if (!token) {
      return res.status(403).send("Access Denied")
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft()
    }

    const user = await User.findById(userId)
    if (!user) return res.status(400).json({ error: "User does not exist." })

    const verified = jwt.verify(token, process.env.JWT_SECRET + user.id)
    req.user = verified
    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
