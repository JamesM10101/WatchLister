import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@emotion/react"
import { Logout, Settings } from "@mui/icons-material"
import { setLogout } from "../state/state"
import BrokenProfilePage from "../components/BrokenProfilePage"
import ReviewsComponent from "../components/shared/ReviewsComponent"
import SavedMoviesComponent from "../components/shared/SavedMoviesComponent"

function ProfilePage({ pUser = {} }) {
  const { userId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const palette = useTheme().palette
  const [user, setUser] = useState(pUser)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tabSelec, setTabSelec] = useState("reviews")
  const isFullSizeScreen = useMediaQuery("(min-width: 600px)")

  let currentUser = useSelector((state) => state.user)

  if (!currentUser) {
    currentUser = {}
  }

  useEffect(() => {
    const getUser = async () => {
      await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        if (res.status === 200) {
          const userRes = await res.json()
          setUser(userRes)
          document.title = `WatchLister | ${user.username}`
        } else {
          setIsError(true)
          document.title = "WatchLister | Error"
        }
        setIsLoading(false)
      })
    }

    // user not passed in and not current user
    if (Object.keys(user).length === 0 && userId !== currentUser._id) {
      getUser()
    } else {
      if (userId === currentUser._id) {
        setUser(currentUser)
        document.title = `WatchLister | ${currentUser.username}`
      }
      setIsLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return isLoading ? (
    <></>
  ) : isError ? (
    <BrokenProfilePage />
  ) : (
    <Box>
      <Box
        height="100%"
        width={isFullSizeScreen ? "65%" : "90%"}
        margin="auto"
        marginTop="1rem"
        marginBottom="0rem"
        sx={{ backgroundColor: palette.background.alt, borderRadius: ".5rem" }}
      >
        <Box
          padding=".5rem"
          paddingRight="0rem"
          margin="1rem"
          display="flex"
          flexDirection="row"
          alignItems="start"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" gap=".5rem">
            <Avatar
              alt="profile"
              variant="rounded"
              sx={{
                bgcolor: palette.neutral.dark,
                width: 96,
                height: 96,
                fontSize: "3rem",
              }}
              src={
                user.picturePath
                  ? `http://localhost:${process.env.SERVER_PORT}/assets/${user.picturePath}`
                  : ""
              }
            >
              {user.username ? user.username[0] : ""}
            </Avatar>

            <Typography variant="h3">
              {user.username ? user.username : "Unknown"}
            </Typography>
          </Box>

          {/* Edit Profile */}
          {userId === currentUser._id ? (
            <div>
              <IconButton
                onClick={() => {
                  dispatch(setLogout())
                  navigate("/")
                }}
                sx={{
                  backgroundColor: palette.background.alt,
                  width: 36,
                  height: 36,
                }}
              >
                <Logout />
              </IconButton>
              <IconButton
                onClick={() => {
                  /* todo: navigate to edit account page */
                }}
                sx={{
                  backgroundColor: palette.background.alt,
                  width: 36,
                  height: 36,
                }}
              >
                <Settings />
              </IconButton>
            </div>
          ) : (
            ""
          )}
        </Box>

        {/* Tabs */}
        <Box
          textAlign="center"
          padding="2rem"
          paddingBottom=".2rem"
          paddingTop="0rem"
          display={userId === currentUser._id ? "flex" : "block"}
          justifyContent="space-between"
        >
          {/* Reviews Tab */}
          <Typography
            onClick={() =>
              tabSelec !== "reviews" ? setTabSelec("reviews") : ""
            }
            color={tabSelec === "reviews" ? palette.primary.main : ""}
            fontSize=".9rem"
            fontWeight="bold"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Reviews
          </Typography>

          {/* Tabs For Logged In User */}
          <>
            {userId === currentUser._id ? (
              <>
                {/* Likes Tab */}
                <Typography
                  onClick={() =>
                    tabSelec !== "likes" ? setTabSelec("likes") : ""
                  }
                  color={tabSelec === "likes" ? palette.primary.main : ""}
                  fontSize=".9rem"
                  fontWeight="bold"
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Likes
                </Typography>
                {/* Saved Tab */}
                <Typography
                  onClick={() =>
                    tabSelec !== "saved" ? setTabSelec("saved") : ""
                  }
                  color={tabSelec === "saved" ? palette.primary.main : ""}
                  fontSize=".9rem"
                  fontWeight="bold"
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Saved
                </Typography>
              </>
            ) : (
              ""
            )}
          </>
        </Box>
      </Box>

      {/* Tabs */}
      <Box
        width={isFullSizeScreen ? "65%" : "90%"}
        margin="auto"
        marginTop="1rem"
        paddingBottom=".5rem"
        display={["reviews", "likes", "saved"].includes(tabSelec) ? "" : "none"}
      >
        {tabSelec === "reviews" ? (
          <ReviewsComponent
            reviews={user.reviews ? [...user.reviews].reverse() : {}}
          />
        ) : tabSelec === "likes" ? (
          <ReviewsComponent
            reviews={user.likes ? Object.keys(user.likes).reverse() : []}
          />
        ) : (
          <SavedMoviesComponent
            movies={user.savedMovies ? [...user.savedMovies].reverse() : []}
          />
        )}
      </Box>
    </Box>
  )
}

export default ProfilePage
