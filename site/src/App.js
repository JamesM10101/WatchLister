import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from "@mui/material/styles"
import { themeSettings } from "./theme"

import HomePage from "./pages/HomePage.jsx"
import MoviePage from "./pages/MoviePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import AuthForm from "./components/AuthForm.jsx"
import Navbar from "./components/Navbar.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import BrokenPage from "./components/BrokenPage"

function App() {
  const mode = useSelector((state) => state.mode)
  const showAuthForm = useSelector((state) => state.needAuthForm)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {showAuthForm ? <AuthForm /> : ""}
        <Routes>
          <Route path="*" element={<BrokenPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
