import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  likes: {
    type: Map,
    of: Boolean, // userId : true
  },
  dislikes: {
    type: Map,
    of: Boolean, // userId : true
  },
})

const Review = mongoose.model("Review", ReviewSchema)
export default Review
