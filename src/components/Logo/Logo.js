import React from 'react'
import Grid from '@mui/material/Grid'
import orange from '../../assets/Images/logo-forex.png'

const Logo = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      columnGap={1}
    >
      <img
        src={orange}
        width="30px"
        height="30px"
        style={{ border: '5px solid #ff6838', borderRadius: 3 }}
        alt="logo"
      />
      <h2>Traider</h2>
    </Grid>
  )
}

export default Logo
