import express from "express"
import {
  getReview,
  toggleLikeReview,
  editReview,
  deleteReview,
} from "../controllers/reviews.js"
import { verifyToken } from "../middleware/auth.js"

const reviewRouter = express.Router()

// read
reviewRouter.get("/:id", verifyToken, getReview)

// update
reviewRouter.patch("/:id/like", verifyToken, toggleLikeReview)
reviewRouter.patch("/:id/edit", verifyToken, editReview)

// delete
reviewRouter.delete("/:id/delete", verifyToken, deleteReview)

export default reviewRouter
