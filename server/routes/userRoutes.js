import express from "express"
import {
  getUser,
  getSavedMovies,
  getLikedReviews,
  getReviewedMovies,
  updateUser,
} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const userRouter = express.Router()

// read
userRouter.get("/:id", getUser)
userRouter.get("/:id/saved", verifyToken, getSavedMovies)
userRouter.get("/:id/likes", verifyToken, getLikedReviews)
userRouter.get("/:id/reviews", getReviewedMovies)

// update
userRouter.patch("/:id/update", verifyToken, updateUser)

export default userRouter
