import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortPlot: {
    type: String,
  },
  longPlot: {
    type: String,
  },
  posterPath: {
    type: String,
  },
  backdropPath: {
    type: String,
  },
  releaseDate: {
    type: Date,
  },
  runtime: {
    type: Number,
  },
  mpaRating: {
    type: String,
  },
  boxOffice: {
    type: String,
  },
  imdbId: {
    type: String,
  },
  tmdbId: {
    type: String,
  },
  trailer: {
    type: String,
  },
  genres: {
    type: Array,
    of: String,
  },
  writers: {
    type: Array,
    of: String,
  },
  directors: {
    type: Array,
    of: String,
  },
  actors: {
    type: Array,
    of: String,
  },
  reviews: {
    type: Array,
    of: String, // reviewId
  },
})

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie
