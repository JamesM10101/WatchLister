import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setSearch } from "../state/state"
import { Box } from "@mui/material"
import MovieCard from "../components/shared/MovieCard.jsx"

function SearchPage() {
  const dispatch = useDispatch()
  let { query } = useParams()
  const [queryResult, setQueryResult] = useState([])
  let oldQuery = useSelector((state) => state.searchQuery)
  let oldResult = useSelector((state) => state.searchResult)

  async function searchByTitle() {
    await fetch(
      `${process.env.REACT_APP_BACKEND_ADDRESS}/movies/${query}/searchByTitle`
    ).then(async (res) => {
      if (res.status === 200) {
        const parsedResult = await res.json()
        dispatch(setSearch({ searchQuery: query, searchResult: parsedResult }))
        setQueryResult(parsedResult)

        // set old queries to new ones -- identifies when user has searched again, prevent inf useEffect loop
        oldQuery = query
        oldResult = parsedResult
      }
    })
  }

  // eslint-disable-next-line
  useEffect(() => {
    // dont repeat the search if querys are the same
    if (query !== oldQuery) {
      searchByTitle()
    } else {
      setQueryResult(oldResult)
    }
  })

  return (
    <Box
      width="80%"
      margin="auto"
      marginTop="1rem"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignContent="center"
      alignItems="center"
      gap="1rem"
    >
      {queryResult.length
        ? queryResult.map((movie, i) => (
            <Box margin="auto" marginLeft="0">
              <MovieCard movie={movie} />
            </Box>
          ))
        : ""}
    </Box>
  )
}

export default SearchPage
