import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './style.css';
import { Link } from 'react-router-dom';
import visa from '../../assets/Images/credit.png';
import { useSelector } from 'react-redux';
import { PayPalButtons } from '@paypal/react-paypal-js';

export default function Paypal() {
  const billing = useSelector((state) => state.billing);

  const handleSubmit = (event) => {

  };

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

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

  const payPalButtonsConfig = {
    label: 'subscribe',
  };

  const onSubscribe = (data, actions) => {
    return actions.subscription
      .create({
        plan_id: 'P-0U167166VC656871FMKYEYQA',
      })
      .then((orderId) => {
        // Your code here after create the order
        console.log('orderId: ', orderId, '\nPaymentSource: ', data.paymentSource);
        return orderId;
      });
  };

  const handleApprove = (data, actions) => {
    return actions.subscription
      .get()
      .then(data => {
        console.log('SubscriptionInfo', data);
      });
  };

  return (
    <React.Fragment>
      <Grid sx={{ backgroundColor: '#0f0f11' }}
            component="form"
            onSubmit={handleSubmit}
            noValidate>
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
          <Box
            sx={{ mt: 1 }}
          >
            <Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Paypal</h3>
                <img
                  src={visa}
                  width="40px"
                  height="25px"
                  style={{
                    borderRadius: 3,
                    margin: '5px'
                  }}
                />{' '}
              </Grid>

              <hr
                style={{
                  border: '1px solid rgb(41, 40, 40)',
                }}
              />
              {/*   <Grid */}
              {/*     px={3} */}
              {/*     pb={3} */}
              {/*     container */}
              {/*     direction="row" */}
              {/*     justifyContent="space-between" */}
              {/*     alignItems="center" */}
              {/*   > */}
              {/*     <Grid> */}
              {/*       <h5>Email</h5> */}
              {/*     </Grid> */}
              {/*     <TextField */}
              {/*       sx={{ */}
              {/*         '& .MuiOutlinedInput-root': { */}
              {/*           '& > fieldset': { */}
              {/*             borderColor: 'rgb(39, 39, 39)', */}
              {/*           }, */}
              {/*         }, */}
              {/*         '& .MuiOutlinedInput-root:hover': { */}
              {/*           '& > fieldset': { */}
              {/*             borderColor: 'rgb(39, 39, 39)', */}
              {/*           }, */}
              {/*         }, */}
              {/*       }} */}
              {/*       inputProps={{ */}
              {/*         style: { */}
              {/*           color: 'white', */}
              {/*           fontSize: 15, */}
              {/*           height: 30 */}
              {/*         }, */}
              {/*       }} */}
              {/*       className="inputField" */}
              {/*       margin="normal" */}
              {/*       placeholder="Enter email" */}
              {/*       required */}
              {/*       fullWidth */}
              {/*       id="email" */}
              {/*       type="email" */}
              {/*       size="small" */}
              {/*       name="email" */}
              {/*       // autoComplete="email" */}
              {/*     /> */}

              {/*     <Grid> */}
              {/*       <h5>Password</h5> */}
              {/*     </Grid> */}
              {/*     <TextField */}
              {/*       sx={{ */}
              {/*         '& .MuiOutlinedInput-root ': { */}
              {/*           '& > fieldset': { */}
              {/*             borderColor: 'rgb(39, 39, 39)', */}
              {/*           }, */}
              {/*         }, */}
              {/*         '& .MuiOutlinedInput-root:hover': { */}
              {/*           '& > fieldset': { */}
              {/*             borderColor: 'rgb(39, 39, 39)', */}
              {/*           }, */}
              {/*         }, */}
              {/*       }} */}
              {/*       inputProps={{ */}
              {/*         style: { */}
              {/*           color: 'white', */}
              {/*           fontSize: 15, */}
              {/*           height: 30 */}
              {/*         }, */}
              {/*       }} */}
              {/*       className="inputField" */}
              {/*       margin="normal" */}
              {/*       placeholder="Enter password" */}
              {/*       required */}
              {/*       fullWidth */}
              {/*       size="small" */}
              {/*       name="password" */}
              {/*       type={values.showPassword ? 'text' : 'password'} */}
              {/*       value={values.password} */}
              {/*       onChange={handleChange('password')} */}
              {/*       id="password" */}
              {/*       autoComplete="current-password" */}
              {/*       InputProps={{ */}
              {/*         endAdornment: ( */}
              {/*           <InputAdornment position="end"> */}
              {/*             <IconButton */}
              {/*               aria-label="toggle password visibility" */}
              {/*               onClick={handleClickShowPassword} */}
              {/*               onMouseDown={handleMouseDownPassword} */}
              {/*               edge="end" */}
              {/*             > */}
              {/*               {values.showPassword ? ( */}
              {/*                 <VisibilityOff sx={{ color: 'gray' }}/> */}
              {/*               ) : ( */}
              {/*                 <Visibility sx={{ color: 'gray' }}/> */}
              {/*               )} */}
              {/*             </IconButton> */}
              {/*           </InputAdornment> */}
              {/*         ), */}
              {/*       }} */}
              {/*     /> */}
              {/*   </Grid> */}
            </Grid>
          </Box>
        </Box>
        <PayPalButtons
          createSubscription={onSubscribe}
          onApprove={handleApprove}
          style={payPalButtonsConfig}
        />
        <Box
          px={3}
          sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#141415',
            borderRadius: 3,
            border: '1px solid rgb(41, 41, 41)',
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="baseline"
              >
                <h4>${billing.price}</h4>
                <p style={{ margin: 0 }}>
                  /{billing.isMonthly ? 'month' : 'year'}
                </p>
              </Grid>
              <Grid>
                <p style={{ margin: 0 }}>{billing.plan} plan</p>
              </Grid>
            </Grid>
            <Link
              to={'/pricing'}
              style={{
                color: '#ee6535',
                fontSize: 13,
                textDecoration: 'none',
              }}
            >
              <Grid>
                <p
                  style={{
                    border: '1px solid rgb(41, 40, 40)',
                    padding: '8px 16px',
                    borderRadius: 5,
                  }}
                >
                  Change
                </p>
              </Grid>
            </Link>
          </Grid>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#ee6535'
          }}
        >
          Next
        </Button>
      </Grid>
    </React.Fragment>
  );
}
