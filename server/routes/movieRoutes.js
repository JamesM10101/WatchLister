import express from "express"
import {
  createMovie,
  getAllMovies,
  getMovie,
  searchByTitle,
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
movieRouter.get("/:query/searchByTitle", searchByTitle)

// update -- admin only
movieRouter.patch("/:id/update", verifyToken, updateMovieDetails)

// delete -- admin only
movieRouter.delete("/:id/delete", verifyToken, deleteMovie)

export default movieRouter
