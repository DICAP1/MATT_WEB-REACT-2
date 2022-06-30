import React from 'react'
import Grid from '@mui/material/Grid'
import oanda from '../../assets/Images/oanda-100.png'

const RenderBrokers = ({ handleOpen, brokers, userBrokers }) => {
  return brokers?.map((broker) => {
    const isOanda = broker.name.toLowerCase().includes('oanda')

    const handleClick = () => {
      handleOpen(broker)
    }

    const choosenBroker = userBrokers?.some(
      (userBroker) => userBroker.broker_id === broker.id
    )

    return (
      <Grid
        className={isOanda ? 'hover1' : 'hover2'}
        item
        xs={5}
        sm={5}
        md={5}
        m={1}
        sx={{ cursor: 'pointer' }}
        onClick={handleClick}
        key={broker.id}
      >
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
            {isOanda ? (
              <img
                src={oanda}
                width="150px"
                height="50px"
                style={{
                  borderRadius: 3,
                  margin: '20px',
                }}
              />
            ) : (
              <h1 className="h">IG</h1>
            )}
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
    )
  })
}

export default RenderBrokers
