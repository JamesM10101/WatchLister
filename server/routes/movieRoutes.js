import express from "express"
import {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovieDetails,
  deleteMovie,
} from "../controllers/movies.js"
import { verifyToken } from "../middleware/auth.js"

const movieRouter = express.Router()

// create -- admin only
movieRouter.post("/create", verifyToken, createMovie)

// read
// movieRouter.get("/", verifyToken, getAllMovies)
movieRouter.get("/:id", getMovie)

// update -- admin only
movieRouter.patch("/:id/update", verifyToken, updateMovieDetails)

// delete -- admin only
movieRouter.delete("/:id/delete", verifyToken, deleteMovie)

export default movieRouter
