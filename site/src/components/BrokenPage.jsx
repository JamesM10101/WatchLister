import { Box, Typography } from "@mui/material"
import React from "react"

function BrokenPage() {
  return (
    <Box m="auto" textAlign="center" mt="3rem">
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">This Page Does Not Exist.</Typography>
    </Box>
  )
}

export default BrokenPage
