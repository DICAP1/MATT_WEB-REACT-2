import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Logo from '../Logo/Logo'
import MainScreen from '../MainScreen/MainScreen'
import { useResetPasswordMutation } from '../../api/auth'
import { pushToast } from '../../slices/toastSlice'
import { toastMessages, toastTypes } from '../../fixtures'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// const theme = createTheme();

export default function ForgotPassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [resetPassword] = useResetPasswordMutation()

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const isValid = form.checkValidity()

    if (!isValid) {
      dispatch(
        pushToast({
          type: toastTypes.warning,
          message: toastMessages.resetPassword.warningEmail,
        })
      )
      return
    }
    const data = new FormData(form)
    const email = data.get('email')

    resetPassword({ email: email })
      .then((data) => {
        if (data.status === 'success') {
          navigate('../signin')
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <MainScreen>
      <Grid
        className="leftSide"
        xs={12}
        sm={12}
        md={6}
        lg={5.5}
        sx={{
          padding: 5,
          paddingRight: {
            lg: 15,
            md: 0,
            sm: 0,
          },
        }}
        square
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* </Grid> */}

          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ height: '88vh' }}
          >
            <Grid>
              {' '}
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                  width: {
                    md: 450,
                    sm: 450,
                    xs: 450,
                  },
                }}
              >
                <Logo />
                <h1>Forgot Password</h1>
                <p style={{ marginBottom: 20 }}>
                  Enter the email address you have registered with Traider
                </p>

                <Grid>
                  <h5>Email address</h5>
                </Grid>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& > fieldset': {
                        borderColor: 'rgb(39, 39, 39)',
                      },
                    },
                    '& .MuiOutlinedInput-root:hover': {
                      '& > fieldset': {
                        borderColor: 'rgb(39, 39, 39)',
                      },
                    },
                  }}
                  inputProps={{
                    style: {
                      color: 'white',
                      fontSize: 15,
                      height: 30,
                    },
                  }}
                  className="inputField"
                  margin="normal"
                  placeholder="Enter email address"
                  required
                  fullWidth
                  id="email"
                  size="small"
                  name="email"
                  autoComplete="email"
                  type="email"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#ff6838',
                    textTransform: 'none',
                    fontWeight: 'normal',
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Grid>
            <Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <p>Copyright &copy; 2022 Traider. All Rights Reserved</p>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </MainScreen>
  )
}
