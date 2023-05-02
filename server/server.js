import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/authRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import userRoutes from "./routes/userRoutes.js"

// Configs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(
  "/userImages",
  express.static(path.join(__dirname, "public/assets/userImages"))
)

// file storage
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/assets/userImages")
  },
  filename: function (req, file, cb) {
    // ensure filename is unique
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

// routes with file upload
app.post("/auth/register", upload.single("picture"), (req, res) =>
  res.status(200).json({ msg: "test" })
)

// routes
app.get("/auth", authRoutes)
app.get("/users", userRoutes)
app.get("/movies", movieRoutes)
app.get("/reviews", reviewRoutes)

// mongoose
const PORT = process.env.PORT || 5001
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
  })
  .catch((err) => console.log(err))
