import mongoose from "mongoose"
import Movie from "./Movie"

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  picturePath: {
    type: String,
    default: "",
  },
  savedMovies: {
    type: Array,
    of: String, // movieId
  },
  reviews: {
    type: Array,
    of: String, // reviewId
  },
  likes: {
    type: Map,
    of: Boolean, // reviewId : true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const User = mongoose.model("User", UserSchema)
export default User
