import * as React from 'react'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import visa from '../../assets/Images/credit.png'
import master from '../../assets/Images/mm.jpg'
import british from '../../assets/Images/british.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import {
  useGetSubscriptionQuery,
  usePostSubscriptionMutation,
} from '../../api/stripe'
import { selectUserCredentials } from '../../slices/authSlice'
import { LoadingButton } from '@mui/lab'
import { pushToast } from '../../slices/toastSlice'
import { toastTypes } from '../../fixtures'

export default function Credit() {
  const [isLoading, setIsLoading] = useState(false)
  const billing = useSelector((state) => state.billing)
  const { publicId, authToken } = useSelector(selectUserCredentials)
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const [postSubscription] = usePostSubscriptionMutation()
  const { data: dataSubscription } = useGetSubscriptionQuery(
    {
      publicId,
      authToken,
    },
    { skip: !publicId || !authToken }
  )

  const inputStyles = {
    style: {
      base: {
        color: '#fff',
        fontSize: '16px',
      },
      invalid: {
        color: '#e01c1c',
      },
    },
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement('cardNumber')
    setIsLoading(true)
    const { error, token } = await stripe.createToken(cardElement)

    if (error) {
      dispatch(
        pushToast({
          type: toastTypes.error,
          message: error.message,
        })
      )
      setIsLoading(false)
    } else {
      postSubscription({
        public_id: publicId,
        token_card: token.id,
        trial_days: 0,
        plans: [billing.plan_id],
      })
        .then(() => {
          navigate('../select-broker')
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <React.Fragment>
      <Grid
        sx={{ backgroundColor: '#0f0f11' }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
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
          <Box sx={{ mt: 1 }}>
            <Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <h3>Credit or Debit Card</h3>
                <img
                  src={visa}
                  width="40px"
                  height="25px"
                  style={{
                    borderRadius: 3,
                    margin: '5px',
                  }}
                  alt="visa logo"
                />
                <img
                  src={master}
                  width="40px"
                  height="25px"
                  style={{
                    borderRadius: 3,
                    margin: '5px',
                  }}
                  alt="mastercard logo"
                />
                <img
                  src={british}
                  width="40px"
                  height="25px"
                  style={{
                    borderRadius: 3,
                    margin: '5px',
                  }}
                  alt="british business bank logo"
                />
              </Grid>
              <hr
                style={{
                  border: '1px solid rgb(41, 40, 40)',
                }}
              />
              <Grid
                px={3}
                pb={3}
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={6}>
                  <Grid>
                    <h5>First name</h5>
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
                    placeholder="Enter first name"
                    required
                    fullWidth
                    id="firstName"
                    size="small"
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Grid>
                    <h5>Last name</h5>
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
                    placeholder="Enter last name"
                    required
                    fullWidth
                    id="lastName"
                    size="small"
                    name="lastName"
                  />
                </Grid>{' '}
                <Grid item xs={12}>
                  <Grid>
                    <h5>Card number</h5>
                  </Grid>
                  <Box
                    sx={{
                      border: '1px solid rgb(39, 39, 39)',
                    }}
                    mt={1.8}
                    p={1.5}
                  >
                    <CardNumberElement options={inputStyles} />
                  </Box>
                </Grid>
                <Grid item xs={12}></Grid>
                <Grid item xs={6}>
                  <Grid>
                    <h5>Expiration Date</h5>
                  </Grid>
                  <Box
                    sx={{
                      border: '1px solid rgb(39, 39, 39)',
                    }}
                    mt={1.8}
                    p={1.5}
                  >
                    <CardExpiryElement options={inputStyles} />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Grid>
                    <h5>CVC</h5>
                  </Grid>
                  <Box
                    sx={{
                      border: '1px solid rgb(39, 39, 39)',
                    }}
                    mt={1.8}
                    p={1.5}
                  >
                    <CardCvcElement options={inputStyles} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
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
                justifyContent="flex-start"
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
              {' '}
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
        <LoadingButton
          type="submit"
          fullWidth
          loading={isLoading}
          variant="text"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#ee6535',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          Start Membership
        </LoadingButton>
      </Grid>
    </React.Fragment>
  )
}
