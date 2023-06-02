import { Box, Typography } from "@mui/material"

function MovieStaff({ actors, directors, writers }) {
  const Seperator = () => {
    return (
      <Box
        width="100%"
        marginTop=".5rem"
        height=".5px"
        sx={{ backgroundColor: "white" }}
      />
    )
  }

  const Staff = ({ title, members, marginLeft }) => {
    return (
      <Box marginTop="1.5rem" display="flex" flexDirection="row">
        <Typography variant="h5" fontWeight="bold" color="white">
          {title}
        </Typography>
        <Box
          marginLeft="3rem"
          color="white"
          display="flex"
          flexDirection="row"
          overflow="clip"
        >
          {members
            ? members.map((director) => (
                <Typography marginLeft={marginLeft} variant="h5">
                  {director}
                </Typography>
              ))
            : "Unknown"}
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      <Staff title={"Director(s)"} members={directors} marginLeft=".2rem" />

      <Seperator />

      <Staff title={"Actor(s)"} members={actors} marginLeft="1.4rem" />

      <Seperator />

      <Staff title={"Writer(s)"} members={directors} marginLeft="1.15rem" />
    </Box>
  )
}

export default MovieStaff
