import React from 'react';
import TomTomMapApi from '../TomTomMapApi';
import { render, screen } from '@testing-library/react';
import Container from '@mui/material/Container';

function LocationPage() {
  return (
    <Container sx={{ maxWidth: 1200, margin: 'auto', padding: 2, marginTop: 2, backgroundColor: 'white', borderRadius: 5 }}>
      <h1>Follow the riders here !</h1>
      <TomTomMapApi/>
    </Container>
  );
}

export default LocationPage;


