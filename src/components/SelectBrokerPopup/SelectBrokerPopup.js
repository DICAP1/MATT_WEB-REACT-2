import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import './style.css';

const SelectBrokerPopup = ({
  open,
  handleClose,
  brokerConfig
}) => {

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    height: 700,
    border: '10px solid rgb(30,30,30 , 0) !important',
    p: 4,
  };

  const isOanda = brokerConfig.name?.toLowerCase()
    .includes('oanda');

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isValid = form.checkValidity();

    if (isValid) {
      let userData = Object.fromEntries(new FormData(form));
      console.log(userData);

      // signIn(userData)
      //   .then((data) => {
      //     if (data.status === 'success') {
      //       console.log(data);
      //       dispatch(setUser({
      //         isAuthenticated: true,
      //         auth_token: data.Authorization, ...userData, ...data.user
      //       })); // todo put only what really need
      //       navigate('../pricing');
      //     }
      //   })
      //     .catch((err) => console.log(err)); // todo add logic
      handleClose();
    } else {
      console.log('not valid inputs'); // todo add logic
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#141415',
            borderRadius: 2,
            border: '1px solid rgb(41, 41, 41)',
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <CloseIcon
              onClick={handleClose}
              sx={{
                color: 'white',
                margin: '15px 15px 0px 0px',
                cursor: 'pointer'
              }}
            />
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid px={3} pb={3}>
              <h1>Connect with {isOanda ? 'Oanda' : 'IG'}</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente atque, iure
              </p>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {isOanda && <><Grid>
                  <h5>Token</h5>
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
                        height: 30
                      },
                    }}
                    className="inputField1"
                    margin="normal"
                    placeholder="Enter token"
                    required
                    fullWidth
                    id="token"
                    type="text"
                    size="small"
                    name="token"
                  /></>}
                {!isOanda && <><Grid>
                  <h5>Username</h5>
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
                        height: 30
                      },
                    }}
                    className="inputField1"
                    margin="normal"
                    placeholder="Enter username"
                    required
                    fullWidth
                    id="username"
                    type="text"
                    size="small"
                    name="username"
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
                        height: 30
                      },
                    }}
                    className="inputField1"
                    margin="normal"
                    placeholder="Enter password"
                    required
                    fullWidth
                    size="small"
                    name="password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
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
                            {values.showPassword ? (
                              <VisibilityOff sx={{ color: 'gray' }}/>
                            ) : (
                              <Visibility sx={{ color: 'gray' }}/>
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid>
                    <h5>API key</h5>
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
                        height: 30
                      },
                    }}
                    className="inputField1"
                    margin="normal"
                    placeholder="Enter API key"
                    required
                    fullWidth
                    id="api"
                    type="text"
                    size="small"
                    name="api"
                  /></>}
                <Grid>
                  <h5>Default account</h5>
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
                      height: 30
                    },
                  }}
                  className="inputField1"
                  margin="normal"
                  placeholder="Enter Default account"
                  required
                  fullWidth
                  id="default_account"
                  type="text"
                  size="small"
                  name="default_account"
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: '#ee6535'
                }}
                style={{
                  textDecoration: 'none',
                  fontSize: '12px',
                  height: '40px',
                  borderRadius: '7px',
                }}
              >
                Done
              </Button>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default SelectBrokerPopup;
