import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './style.css';
import MainPricingDashboard from '../MainPricingDashboard/MainPricingDashboard';
import oanda from '../../assets/Images/oanda-100.png';
import SelectBrokerPopup from '../SelectBrokerPopup/SelectBrokerPopup';
import { getAllBrokers } from '../../api/brokers';

export default function SelectBroker() {
  const [isOpen, setIsOpen] = useState(false);
  const [brokers, setBrokers] = useState([]);
  const [done, setDone] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    (async () => {
      const allBrokers = await getAllBrokers();
      setBrokers(allBrokers);
    })();
  }, []);

  const renderBrokers = () => {
    console.log(brokers);
    return brokers.map(broker => {
      const isOanda = broker.name
        .toLowerCase()
        .includes('oanda');
      return (
        <Grid className={isOanda ? 'hover1' : 'hover2'}
              item xs={5} sm={5} md={5} m={1}
              sx={{ cursor: 'pointer' }}
              onClick={handleOpen}
              key={broker.id}>
          <p
            style={{
              border: '1px solid rgb(41, 40, 40 , 0.5)',
              padding: '0px 0px',
              borderRadius: 5,
              backgroundColor: done ? '#ee6535' : null,
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {isOanda
                ? <img
                  src={oanda}
                  width="150px"
                  height="50px"
                  style={{
                    borderRadius: 3,
                    margin: '20px'
                  }}
                  tintColor="blue"
                />
                : <h1 className="h">IG</h1>}
            </Grid>
            <hr
              style={{
                height: 0.1,
                borderColor: 'rgb(41, 41, 41 , 0.5)',
              }}
            />
            <Grid
              className="in"
              container
              p={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              {broker.title}
            </Grid>
          </p>
        </Grid>
      );
    });
  };

  return (
    <React.Fragment>
      <MainPricingDashboard>
        <SelectBrokerPopup open={isOpen} handleClose={handleClose}/>
        <Grid sx={{ backgroundColor: '#0f0f11' }}>
          <Container
            maxWidth="lg"
            component="main"
            sx={{
              backgroundColor: 'none',
              height: '100vh'
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <h1>Select your broker</h1>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <p>Your membership starts as soon as you set up payment. </p>
            </Grid>
            <Container component="main" maxWidth="sm">
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
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {renderBrokers()}
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
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
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
                {done ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
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
  );
}
