import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"

import HomePage from "./pages/HomePage.jsx"
import StartPage from "./pages/StartPage.jsx"
import MoviePage from "./pages/MoviePage.jsx"
import ReviewPage from "./pages/ReviewPage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/review/:reviewId" element={<ReviewPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
