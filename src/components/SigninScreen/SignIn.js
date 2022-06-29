import * as React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './style.css';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import facebook from '../../assets/Icons/facebook.png';
import google from '../../assets/Icons/google.png';
import linkedin from '../../assets/Icons/linkedin.png';
import Logo from '../Logo/Logo';
import MainScreen from '../MainScreen/MainScreen';
import { useConfirmEmailQuery, useSignInMutation } from '../../api/auth';
import { setUser } from '../../slices/authSlice';
import { LoadingButton } from '@mui/lab';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();
  const [confirmEmailToken, setConfirmEmailToken] = useState('');
  const {data: confirmEmail} = useConfirmEmailQuery(confirmEmailToken, {skip : !confirmEmailToken});
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const isValid = form.checkValidity()

    if (!isValid) {
      console.log('not valid inputs') // todo add logic
      return
    }
    try {
      const formData = new FormData(form)
      const email = formData.get('email')
      const password = formData.get('password')
      const userData = {
        email,
        password
      };
      setIsLoading(true);
      const {data: user} = await signIn(userData);
      if (user?.status === 'success') {
        dispatch(setUser({
          auth_token: user.Authorization,
          isAuth: true,
          ...userData,
          ...user.user,
        })) // todo put only what really need
        localStorage.setItem('credentials', JSON.stringify({
          public_id: user.public_id,
          token: user.Authorization,
        }))
        // navigate(user.user.has_onboard ? '/' : '../pricing');
        navigate('../pricing')
      }
    } catch (err) {
      console.log(err) // todo add logic
      setIsLoading(false)
    }
  }

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  useEffect(() => {
    if (searchParams.has('confirm')) {
      const token = searchParams.get('confirm')

      setConfirmEmailToken(token);
    }
  }, [])

  useEffect(() => {
    try {
      if (confirmEmail?.status === 'success') {
        //TODO: add toast
        console.log(confirmEmail.message);
        setSearchParams('', {replace: true});
      }
    }
    catch (error) {
      console.error(error);
    }
    
  }, [confirmEmail])

  return (
    <MainScreen>
      <Grid
        className='leftSide'
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
        direction='row'
        justifyContent='center'
        alignItems='center'
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
            direction='column'
            justifyContent='space-between'
            sx={{ height: '88vh' }}
          >
            <Grid>
              {' '}
              <Box
                component='form'
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
                <h1>Welcome Back!</h1>
                <p style={{ marginBottom: 20 }}>
                  Stocks, Forex, Indices, Bonds, Equities
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
                  className='inputField'
                  margin='normal'
                  placeholder='Enter email address'
                  required
                  fullWidth
                  id='email'
                  size='small'
                  name='email'
                  autoComplete='email'
                />

                <Grid>
                  <h5>Password</h5>
                </Grid>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root ': {
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
                  className='inputField'
                  margin='normal'
                  placeholder='Enter password'
                  required
                  fullWidth
                  size='small'
                  name='password'
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  id='password'
                  autoComplete='current-password'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {values.showPassword ? (
                            <VisibilityOff sx={{ color: 'gray' }} />
                          ) : (
                            <Visibility sx={{ color: 'gray' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid
                  container
                  direction='row'
                  justifyContent='flex-end'
                  alignItems='flex-end'
                >
                  <Link
                    to='/forgot-password'
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      fontSize: 13,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <LoadingButton
                  type='submit'
                  fullWidth
                  loading={isLoading}
                  variant='text'
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#ff6838',
                    textTransform: 'none',
                    fontWeight: 'normal',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }}
                >
                  Sign In
                </LoadingButton>

                <Grid
                  container
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                >
                  <p>Or continue with this social profile</p>
                </Grid>
                <Grid container direction='row' justifyContent='center'>
                  <span className='icon'>
                    <img src={google} width='25px' height='25px' />
                  </span>
                  <span className='icon'>
                    <img src={facebook} width='25px' height='25px' />
                  </span>
                  <span className='icon'>
                    <img src={linkedin} width='25px' height='25px' />{' '}
                  </span>
                </Grid>
              </Box>
            </Grid>
            <Grid>
              <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                <p style={{ color: 'rgb(209, 209, 209)' }}>
                  Don't have an account? &nbsp;
                </p>

                <Link
                  to='/register'
                  style={{
                    color: '#ee6535',
                    fontSize: 13,
                    textDecoration: 'none',
                  }}
                >
                  Sign Up
                </Link>
              </Grid>
              <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
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
