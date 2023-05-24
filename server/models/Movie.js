import mongoose from "mongoose"

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imagePath: {
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
  genre: {
    type: Array,
    of: String,
  },
  director: {
    type: Array,
    of: String,
  },
  actors: {
    type: Array,
    of: String, // name
  },
  reviews: {
    type: Array,
    of: String, // reviewId
  },
})

const Movie = mongoose.model("Movie", MovieSchema)
export default Movie
