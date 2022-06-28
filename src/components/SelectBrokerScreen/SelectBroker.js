import * as React from 'react'
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import './style.css'
import MainPricingDashboard from '../MainPricingDashboard/MainPricingDashboard'
import RenderBrokers from '../RenderBrokers/RenderBrokers'
import { getAllBrokers, getUserBrokers } from '../../api/brokers'
import { useSelector } from 'react-redux'
import { selectUserCredentials } from '../../slices/authSlice'
import SelectBrokerPopup from '../SelectBrokerPopup/SelectBrokerPopup'
import { getUserById, patchUserById } from '../../api/users'
import { useNavigate } from 'react-router-dom'

export default function SelectBroker() {
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [brokerSelected, setBrokerSelected] = useState(false)
  const [brokerConfig, setBrokerConfig] = useState({})
  const [brokers, setBrokers] = useState([])
  const [userBrokers, setUserBrokers] = useState([])
  const navigate = useNavigate()

  const {
    publicId,
    authToken,
  } = useSelector(selectUserCredentials)

  const handleOpen = (config) => {
    setPopupIsOpen(true)
    setBrokerConfig(config)
  }
  const handleClose = () => setPopupIsOpen(false)

  const handlePopupSubmit = async () => {
    const userBrokersData = await getUserBrokers(publicId, authToken)
    setUserBrokers(userBrokersData)
    setBrokerSelected(userBrokersData.length !== 0)
  }

  const handleClick = () => {
    navigate('../')
  }

  useEffect(() => {
    (async () => {
      const brokersData = await getAllBrokers()
      const userBrokersData = await getUserBrokers(publicId, authToken)
      const user = await getUserById(publicId, authToken)

      setBrokers(brokersData)
      setUserBrokers(userBrokersData)
      setBrokerSelected(userBrokersData.length !== 0)
      if (!user.risk) {
        patchUserById(publicId, authToken, { risk: 2 })
          .then(() => console.log('risk set'))
          .catch(err => console.log('broker data not sent', err)) // todo add logic;
      } else {
        console.log('risk: ', user.risk)
      }
    })()
  }, [])

  return (
    <React.Fragment>
      <MainPricingDashboard>
        <Grid sx={{ backgroundColor: '#0f0f11' }}>
          <SelectBrokerPopup open={popupIsOpen} handleClose={handleClose}
                             brokerConfig={brokerConfig} onSubmit={handlePopupSubmit} />
          <Container
            maxWidth='lg'
            component='main'
            sx={{
              backgroundColor: 'none',
              height: '100vh',
            }}
          >
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <h1>Select your broker</h1>
            </Grid>

            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <p>Your membership starts as soon as you set up payment. </p>
            </Grid>
            <Container component='main' maxWidth='sm'>
              <Grid sx={{ backgroundColor: '#0f0f11' }}>
                <Box
                  px={3}
                  sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#141415',
                    borderRadius: 3,
                    border: '1px solid rgb(41, 41, 41 , 0.5)',
                  }}
                >
                  <Grid
                    container
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <RenderBrokers handleOpen={handleOpen} brokers={brokers}
                                   userBrokers={userBrokers} />
                  </Grid>
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
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Grid>
                      <p style={{ margin: 0 }}>How does this work?</p>
                    </Grid>
                    <Grid>
                      <p
                        style={{
                          border: '1px solid rgb(41, 40, 40)',
                          padding: '8px 16px',
                          borderRadius: 5,
                        }}
                      >
                        Know more
                      </p>
                    </Grid>
                  </Grid>
                </Box>
                {brokerSelected ? (
                  <Button
                    type='button'
                    onClick={handleClick}
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#ee6535',
                      textTransform: 'capitalize',
                    }}
                    style={{
                      textDecoration: 'none',
                      fontSize: '12px',
                      height: '40px',
                      borderRadius: '7px',
                    }}
                  >
                    Let's Get Started
                  </Button>
                ) : null}
              </Grid>
            </Container>
          </Container>
        </Grid>
      </MainPricingDashboard>
    </React.Fragment>
  )
}
