import express from "express"
import {
  createMovie,
  getAllMovies,
  getMovie,
  searchByTitle,
  updateMovieDetails,
  deleteMovie,
  getRandomMovies,
  getRecentReleases,
  getHighestRated,
  getRecentlyAdded,
} from "../controllers/movies.js"
import { verifyToken } from "../middleware/auth.js"

const movieRouter = express.Router()

// create -- admin only
movieRouter.post("/create", verifyToken, createMovie)

// read
// movieRouter.get("/", verifyToken, getAllMovies)
movieRouter.get("/getMovie/:id", getMovie)
movieRouter.get("/random", getRandomMovies)
movieRouter.get("/recentReleases", getRecentReleases)
movieRouter.get("/highestRated", getHighestRated)
movieRouter.get("/recentlyAdded", getRecentlyAdded)
movieRouter.get("/:query/searchByTitle", searchByTitle)

// update -- admin only
movieRouter.patch("/:id/update", verifyToken, updateMovieDetails)

// delete -- admin only
movieRouter.delete("/:id/delete", verifyToken, deleteMovie)

export default movieRouter
