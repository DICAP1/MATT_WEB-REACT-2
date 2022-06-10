import * as React from "react";
import {useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import MainScreen from "../MainScreen/MainScreen";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Logo from '../Logo/Logo';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../slices/authSlice';
import {useNavigate} from 'react-router-dom';
import {register} from '../../utils/auth';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

// const theme = createTheme();

export default function SignUp() {
  const email = useSelector(state => state.auth.user.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isValid = form.checkValidity();

    if (isValid) {
      const data = new FormData(form);
      const name = data.get('firstName');
      const lastName = data.get('lastName');
      const password = data.get('password');
      const retypePassword = data.get('confirmPassword');

      const isPasswordEqual = password === retypePassword;

      if (isPasswordEqual) {
        const userData = {
          email,
          first_name: name,
          last_name: lastName,
          password,
          retypePassword: password
        };

        dispatch(setUser({name, lastName, password}));
        register(userData)
          .then(data => {
            if (data) {
              navigate('../');
            }
          })
          .catch(err => console.log(err)); // todo add logic
      } else {
        console.log('passwords are not the same'); // todo add logic
      }
    } else {
      console.log('not valid fields'); // todo add logic
    }
   };

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    confirmPassword: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
      showConfirmPassword: !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <MainScreen>
      <Grid
        className="leftSide"

        xs={12}
        sm={12}
        md={6}
        lg={5.5}
        sx={{ padding: 5, paddingRight: {lg: 15 ,md : 0, sm : 0 }}}
        square
        container
  direction="row"
  justifyContent="center"
  alignItems="center"
      >
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* </Grid> */}

          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ height: "88vh" }}
          >
            <Grid>
              {" "}
             <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 , width : { md: 450 , sm : 450 , xs : 450} , }}
              >
                <Logo/>
                <h1>Create an account</h1>
                <p style={{ marginBottom: 20 }}>
                Stocks, Forex, Indices, Bonds, Equities
                </p>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  // justifyContent="space-between"
                  alignItems="center"

                >
                  <Grid item xs={6} >
                    <Grid>
                      <h5>First name</h5>
                    </Grid>
                    <TextField

                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& > fieldset": {
                            borderColor: "rgb(39, 39, 39)",
                          },
                        },
                        "& .MuiOutlinedInput-root:hover": {
                          "& > fieldset": {
                            borderColor: "rgb(39, 39, 39)",
                          },
                        },
                      }}
                        inputProps={{ style: { color: "white",fontSize: 15 , height:30 } }}


                      className="inputField"
                      margin="normal"
                      placeholder="Enter first name"
                      required
                      fullWidth
                      id="firstName"
                      size="small"
                      name="firstName"
                      // autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={6} >
                    <Grid>
                      <h5>Last name</h5>
                    </Grid>
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& > fieldset": {
                            borderColor: "rgb(39, 39, 39)",
                          },
                        },
                        "& .MuiOutlinedInput-root:hover": {
                          "& > fieldset": {
                            borderColor: "rgb(39, 39, 39)",
                          },
                        },
                      }}
                      inputProps={{ style: { color: "white",fontSize: 15 , height:30 } }}
                      className="inputField"
                      margin="normal"
                      placeholder="Enter last name"
                      required
                      fullWidth
                      id="lastName"
                      size="small"
                      name="lastName"
                      // autoComplete="email"
                    />
                  </Grid>
                </Grid>

                <Grid>
                  <h5>Password</h5>
                </Grid>
                <TextField

                sx={{
                  "& .MuiOutlinedInput-root ": {
                    "& > fieldset": {
                      borderColor: "rgb(39, 39, 39)",
                    },
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "rgb(39, 39, 39)",
                    },
                  },
                }}
                  inputProps={{ style: { color: "white",fontSize: 15 , height:30 } }}


                className="inputField"
                margin="normal"
                placeholder="Enter password"
                required
                fullWidth
                size="small"
                name="password"
            onChange={handleChange('password')}

                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff sx={{color: 'gray'}}/> : <Visibility sx={{color: 'gray'}}/>}
                    </IconButton>
                  </InputAdornment>
                  ),
                }}

              />

                <Grid>
                  <h5>Confirm password</h5>
                </Grid>
                <TextField

                sx={{
                  "& .MuiOutlinedInput-root ": {
                    "& > fieldset": {
                      borderColor: "rgb(39, 39, 39)",
                    },
                  },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "rgb(39, 39, 39)",
                    },
                  },
                }}
                  inputProps={{ style: { color: "white",fontSize: 15 , height:30 } }}


                className="inputField"
                margin="normal"
                placeholder="Enter password"
                required
                fullWidth
                size="small"
                name="confirmPassword"
                type={values.showConfirmPassword ? 'text' : 'password'}
                value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}

                id="confirmPassword"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? <VisibilityOff sx={{color: 'gray'}}/> : <Visibility sx={{color: 'gray'}}/>}
                    </IconButton>
                  </InputAdornment>
                  ),
                }}

              />

                <Grid
                  container
                  direction="row"
                  //   justifyContent="center"
                  alignItems="center"
                >
                  <Checkbox {...label} />
                  <p style={{ color: "rgb(209, 209, 209)" }}>
                    I agree all the statements included in&nbsp;
                  </p>
                  <p style={{ color: "#ee6535" }}>Terms of Use &nbsp;</p>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: "#ff6838" , textTransform:'none' , fontWeight :'normal'}}
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
  );
}
