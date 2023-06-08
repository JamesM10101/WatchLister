import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Clear as ClearIcon } from "@mui/icons-material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { object, string } from "yup"
import { Form, Formik } from "formik"
import { Box } from "@mui/system"
import Dropzone from "react-dropzone"
import FlexBetween from "./shared/FlexBetween"
import { setLogin, setNeedAuthForm } from "../state/state"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { userLogin, userRegistration } from "../functions/Auth"

// yup schemas and initial values for form
const registerSchema = object({
  email: string().email("invalid email").required("required"),
  password: string().required("required"),
  username: string().required("required"),
  picture: string(),
})

const loginSchema = object({
  email: string().email("invalid email").required("required"),
  password: string().required("required"),
})

const initialValuesReg = {
  username: "",
  email: "",
  password: "",
  picture: "",
}

const initialValuesLogin = {
  email: "",
  password: "",
}

function AuthForm() {
  const [severity, setSeverity] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [showPassowrd, setShowPassword] = useState(false)
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const isFullSizeScreen = useMediaQuery("(min-width: 600px)")

  const registerUser = async (values, onSubmitProps) => {
    // build the form data
    const formData = new FormData()
    for (let i in values) {
      formData.append(i, values[i])
    }
    formData.append("picturePath", values.picture.name)

    // register user on backend
    const regResponse = await userRegistration(formData)

    if (regResponse.status === 201) {
      setIsLogin(true)
      onSubmitProps.resetForm()
    } else {
      setAlertMsg(regResponse.error)
      setSeverity("error")
    }
  }

  const loginUser = async (values, onSubmitProps) => {
    // login user on backend
    const loginResponse = await userLogin(values)

    const jsonResponse = await loginResponse.json()

    if (loginResponse.status === 200) {
      dispatch(
        setLogin({
          user: jsonResponse.user,
          token: jsonResponse.token,
        })
      )
      dispatch(setNeedAuthForm())
      onSubmitProps.resetForm()
      window.location.reload()
    } else {
      setAlertMsg(jsonResponse.error)
      setSeverity("error")
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await loginUser(values, onSubmitProps)
    else await registerUser(values, onSubmitProps)
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassowrd)
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
        aria-label="Exit"
        sx={{ scale: "1.5", float: "right", m: "4%" }}
        onClick={() => dispatch(setNeedAuthForm())}
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
          initialValues={isLogin ? initialValuesLogin : initialValuesReg}
          validationSchema={isLogin ? loginSchema : registerSchema}
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
                {/* email, password input */}
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
                  label="Password"
                  type={showPassowrd ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {showPassowrd ? (
                          <Visibility onClick={togglePasswordVisibility} />
                        ) : (
                          <VisibilityOff onClick={togglePasswordVisibility} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />

                {/* username & dropzone (only active when registering) */}
                {!isLogin && (
                  <>
                    <TextField
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.location}
                      name="username"
                      error={
                        Boolean(touched.username) && Boolean(errors.username)
                      }
                      helperText={touched.username && errors.username}
                    />
                    <Dropzone
                      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }} // this took way too long
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <Typography>Add Picture Here</Typography>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </>
                )}
              </Box>

              {/* Register/Login Button */}
              <Button
                aria-label={isLogin ? "Login" : "Register"}
                fullWidth
                type="submit"
                sx={{
                  m: "1rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.neutral.dark },
                }}
              >
                <Typography>{isLogin ? "Login" : "Register"}</Typography>
              </Button>

              {/* Auth type switcher */}
              <Typography
                onClick={() => {
                  setIsLogin(!isLogin)
                  resetForm()
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.neutral.dark,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account? Sign up here"
                  : "Already have an account? Login now."}
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>

      {/* Error Alert */}
      {severity && (
        <Alert severity={severity} sx={{ marginTop: "1rem" }}>
          <Typography>{alertMsg}</Typography>
        </Alert>
      )}
    </Box>
  )
}

export default AuthForm
