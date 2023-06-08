import {
  Alert,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Clear as ClearIcon } from "@mui/icons-material"
import { Box } from "@mui/system"
import { object, string } from "yup"
import { Form, Formik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { setNeedUpdateForm, setUser } from "../state/state"
import { useState } from "react"
import { editProfile } from "../functions/Users"

// yup schemas and initial values for form
const updateSchema = object({
  email: string().email("invalid email").required("required"),
  username: string().required("required"),
})

function EditProfile({ user }) {
  const isFullSizeScreen = useMediaQuery("(min-width: 600)")
  const token = useSelector((state) => state.token)
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("") // eslint-disable-line no-unused-vars
  const { palette } = useTheme()
  const dispatch = useDispatch()

  const initialValues = {
    username: user.username,
    email: user.email,
    picture: "",
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    const object = {}
    object["email"] = values.email
    object["username"] = values.username

    const res = await editProfile(user._id, token, object)

    const result = await res.json()
    if (res.status === 200) {
      dispatch(setUser({ user: result }))
      dispatch(setNeedUpdateForm())
      window.location.reload()
    } else {
      setSeverity("error")
      setAlertMsg(result.error)
    }
  }

  return (
    <Box
      backgroundColor={palette.neutral.light.concat("AA")}
      position={"fixed"}
      w="100%"
      h="100%"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
      sx={{ overflowX: "hidden" }}
    >
      {/* Exit Button */}
      <IconButton
        aria-label="Label"
        sx={{ scale: "1.5", float: "right", m: "4%" }}
        onClick={() => dispatch(setNeedUpdateForm())}
      >
        <ClearIcon
          sx={{
            color:
              palette.mode === "dark"
                ? palette.primary.main
                : palette.neutral.dark,
          }}
        />
      </IconButton>

      {/* Auth Card */}
      <Box
        width={isFullSizeScreen ? "50%" : "75%"}
        p="2rem"
        m="5rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={updateSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box display={"grid"} gap="1em">
                {/* email, username input */}
                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                <TextField
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={Boolean(touched.username) && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Box>

              {/* Update Button */}
              <Button
                aria-label="Update"
                fullWidth
                type="submit"
                sx={{
                  m: "1rem 0 0 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.neutral.dark },
                }}
              >
                <Typography>Update</Typography>
              </Button>
            </Form>
          )}
        </Formik>

        {/* Error Alert */}
        {severity && (
          <Alert severity={severity} sx={{ marginTop: "1rem" }}>
            <Typography>
              Sorry! Something went wrong on our end. Please try again later.
            </Typography>
          </Alert>
        )}
      </Box>
    </Box>
  )
}

export default EditProfile
