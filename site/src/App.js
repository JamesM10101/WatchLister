import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import StartPage from "./pages/StartPage.jsx"
import MoviePage from "./pages/MoviePage.jsx"
import ReviewPage from "./pages/ReviewPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/review/:reviewId" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
