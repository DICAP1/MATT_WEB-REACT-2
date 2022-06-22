import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import oanda from '../../assets/Images/oanda-100.png';
import { useSelector } from 'react-redux';
import { selectUserCredentials } from '../../slices/authSlice';
import { getAllBrokers, getUserBrokers } from '../../api/brokers';
import SelectBrokerPopup from '../SelectBrokerPopup/SelectBrokerPopup';

const RenderBrokers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [brokers, setBrokers] = useState([]);
  const [userBrokers, setUserBrokers] = useState([]);

  const {
    publicId,
    authToken
  } = useSelector(selectUserCredentials);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    (async () => {
      const brokersData = await getAllBrokers();
      const userBrokersData = await getUserBrokers(publicId, authToken);
      setBrokers(brokersData);
      setUserBrokers(userBrokersData);
    })();

  }, [publicId, authToken]);

  console.log('All brokers: ', brokers);
  console.log('User brokers: ', userBrokers);

  return brokers.map(broker => {
    const isOanda = broker.name
      .toLowerCase()
      .includes('oanda');

    const choosenBroker = userBrokers.some(userBroker => userBroker.broker_id === broker.id);

    return (
      <>
        <SelectBrokerPopup open={isOpen} handleClose={handleClose}/>
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
              backgroundColor: choosenBroker ? '#ee6535' : null,
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
      </>
    );
  });
};

export default RenderBrokers;
