import express from "express"
import {
  getUser,
  getSaved,
  getLikes,
  getReviews,
  updateUser,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const userRouter = express.Router()

// read
userRouter.get("/:id", verifyToken, getUser)
userRouter.get("/:id/saved", verifyToken, getSaved)
userRouter.get("/:id/likes", verifyToken, getLikes)
userRouter.get("/:id/reviews", verifyToken, getReviews)

// update
userRouter.get("/:id/update", verifyToken, updateUser)

export default userRouter
