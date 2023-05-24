import { useState } from "react"
import {
  Avatar,
  Badge,
  IconButton,
  InputBase,
  Popover,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  DarkModeOutlined,
  LightModeOutlined,
  NotificationsOutlined,
  Search,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setNeedAuthForm } from "../state/state.js"
import { Link } from "react-router-dom"
import FlexBetween from "./shared/FlexBetween.jsx"
import defaultUserProfile from "../resources/defaultUserProfile.jpg"

function Navbar() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isFullSizeScreen = useMediaQuery("(min-width: 600px)")

  // theme
  const palette = useTheme().palette
  const themeMode = palette.mode

  // handle popover event -- cut from mui docs
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleSearch = () => {
    // todo implement actual search here
    console.log("query: " + searchQuery)
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

      {/* Right Adjusted elements */}
      <FlexBetween gap={isFullSizeScreen ? "1rem" : "0.1rem"}>
        {/* Search Icon */}
        <IconButton
          onClick={handleClick}
          sx={{ transform: "scale(1.3)", color: palette.neutral.dark }}
        >
          <Search />
        </IconButton>

        {/* Search Popover */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <InputBase
            sx={{ padding: ".5rem" }}
            placeholder="Search..."
            onChange={(event) => {
              setSearchQuery(event.target.value)
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
          />
          <IconButton onClick={handleSearch}>
            <Search />
          </IconButton>
        </Popover>

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

        {/* Notications */}
        {/* todo -- accurately set the badgeContent */}
        <Badge color="secondary" badgeContent={0}>
          <IconButton
            // todo -- add some functionality to this button
            onClick={() => {}}
            sx={{ transform: "scale(1.3)" }}
          >
            {themeMode === "dark" ? (
              <NotificationsOutlined />
            ) : (
              <NotificationsOutlined sx={{ color: palette.neutral.dark }} />
            )}
          </IconButton>
        </Badge>

        {/* User Icon (WARNING: Nested Ternaries Ahead 🤮) */}
        {/* Set the user icon to the users image or first initial -- routes to account page */}
        {user ? (
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none" }}>
            {user.picturePath !== "undefined" ? (
              <Avatar
                alt="profile"
                sx={{ bgcolor: palette.neutral.dark }}
                src={`http://localhost:${process.env.SERVER_PORT}/assets/${user.picturePath}`}
              />
            ) : user ? (
              <Avatar alt="profile" sx={{ bgcolor: palette.neutral.dark }}>
                {user.username[0]}
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
            src={defaultUserProfile}
            sx={{
              bgcolor: palette.neutral.dark,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        )}
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar
