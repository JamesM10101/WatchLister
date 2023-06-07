import { useState } from "react"
import {
  Avatar,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  DarkModeOutlined,
  LightModeOutlined,
  Person,
  Search,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setNeedAuthForm } from "../state/state.js"
import { Link, useNavigate } from "react-router-dom"
import FlexBetween from "./shared/FlexBetween.jsx"

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isFullSizeScreen = useMediaQuery("(min-width: 600px)")
  const [isSearching, setIsSearching] = useState(false)

  // theme
  const palette = useTheme().palette
  const themeMode = palette.mode

  const [searchQuery, setSearchQuery] = useState("")
  const handleSearch = () => {
    navigate(`/search/${searchQuery}`)
  }

  return (
    <FlexBetween
      padding={isFullSizeScreen ? "1rem 6%" : "0.5rem 3%"}
      backgroundColor={palette.background.alt}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography
          fontWeight="bold"
          color="primary"
          fontSize="clamp(.8rem, 1.7rem, 2rem)"
          sx={{
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
        >
          WatchLister
        </Typography>
      </Link>

      {isSearching ? (
        <FlexBetween
          width="50%"
          borderRadius="1rem"
          paddingLeft=".6rem"
          paddingBottom=".2rem"
          paddingTop=".2rem"
          sx={{ backgroundColor: palette.background.default }}
          onBlur={() => setIsSearching(false)}
        >
          <InputBase
            autoFocus={true}
            placeholder="Search..."
            onChange={(event) => {
              setSearchQuery(event.target.value)
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
            sx={{ width: "100%" }}
          />
        </FlexBetween>
      ) : (
        <>
          {/* Right Adjusted elements */}
          <FlexBetween gap={isFullSizeScreen ? "1rem" : "0.1rem"}>
            {/* Search Icon */}
            <IconButton
              onClick={() => setIsSearching(true)}
              sx={{ transform: "scale(1.3)", color: palette.neutral.dark }}
            >
              <Search />
            </IconButton>

            {/* Theme Mode */}
            <IconButton
              onClick={() => {
                dispatch(setMode())
              }}
              sx={{ transform: "scale(1.3)" }}
            >
              {themeMode === "dark" ? (
                <DarkModeOutlined />
              ) : (
                <LightModeOutlined sx={{ color: palette.neutral.dark }} />
              )}
            </IconButton>

            {/* Set the user icon to the users image or first initial */}
            {user ? (
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none" }}
              >
                {user.picturePath !== "undefined" ? (
                  <Avatar
                    alt="profile"
                    sx={{ bgcolor: palette.neutral.dark }}
                    src={`${process.env.REACT_APP_BACKEND_ADDRESS}/userImages/${user.picturePath}`}
                  />
                ) : user ? (
                  <Avatar alt="profile" sx={{ bgcolor: palette.neutral.dark }}>
                    <Person
                      sx={{
                        width: 24,
                        height: 24,
                      }}
                    />
                  </Avatar>
                ) : (
                  "" // how
                )}
              </Link>
            ) : (
              // set the default profile image
              <Avatar
                onClick={() => dispatch(setNeedAuthForm())}
                alt="profile"
                sx={{
                  bgcolor: palette.neutral.dark,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Person />
              </Avatar>
            )}
          </FlexBetween>
        </>
      )}
    </FlexBetween>
  )
}

export default Navbar
