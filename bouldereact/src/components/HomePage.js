import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; 
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { allRiders } from '../riderdata'; 
import Carousel from '../Carousel'


function HomePage() {
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    // Fetching data from API
    axios.get('http://localhost:3000/api/v1/home')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Calculating countdown
    const calculateCountdown = () => {
      const eventDate = new Date('April 1, 2020').getTime();
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance <= 0) {
        setCountdown('Event has already started!');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
      }
    };

    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSloganSubmission = (e) => {
    e.preventDefault();
  };

  return (
    <Container m={4} margin={1}>


      <Grid container direction="column" spacing={4}>
        {/* Zone 1: Décrire la course et la ville avec le décompte */}
        <Grid item xs={12}>
          <Box p={4} bgcolor="#8F9779" color="#ffffff" marginTop={2}>
            <Typography variant="h2" gutterBottom sx={{ display: 'flex', justifyContent: 'center' }}>Welcome to Boulder Bike Tour</Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Once every decade, an exciting, prestigious, and inspiring bike race takes place in Colorado at the foot of the Rocky Mountains.
              It's the Boulder Bike Tour, and it's coming up next year!The Boulder Bike Tour is an annual cycling event held in the picturesque city of Boulder, Colorado. Cyclists from around the world gather to challenge themselves against the stunning backdrop of the Rocky Mountains. With routes catering to all skill levels, from beginners to seasoned pros, the Boulder Bike Tour offers an unforgettable experience for riders of all abilities. Join us for a day of camaraderie, competition, and celebration as we pedal through the scenic landscapes and vibrant streets of Boulder.
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
              <img
                src={require("../media/clock.png")}
                alt="Clock"
                style={{ width: '5%', height: 'auto', marginRight:20 }}
              />
              {countdown ? countdown : <CircularProgress />}
            </Typography>
          </Box>
        </Grid>

        {/* Zone 2: Participer au concours de slogan */}
        <Grid item xs={12}>
          <Box p={2} bgcolor="#ffffff" color="#000000" textAlign="center">
            <Typography variant="h4" color="gray">Participate in the Slogan Contest</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Get your creative juices flowing and join our exciting slogan contest! We're searching for the perfect phrase to capture the spirit of the Boulder Bike Tour. With just 50 characters, craft a catchy and memorable slogan that celebrates the thrill of cycling, the beauty of Colorado, and the camaraderie of our biking community. Whether you're a wordsmith or a cycling enthusiast, this is your chance to leave your mark on our event. Submit your slogan now for a chance to win fantastic prizes and eternal bragging rights!
            </Typography>
            <img
                src={require("../media/mountainbike.jpg")}
                alt="Mountain Bike"
                style={{ width: '50%', height: 'auto', marginRight:20 }}
              />
            <form onSubmit={handleSloganSubmission}>
              <Button component={Link} to="/contest" type="submit" variant="contained" sx={{ width: '200px', marginTop: 2, backgroundColor: '#8F9779', color: '#ffffff' }}>Submit</Button>
            </form>
          </Box>
        </Grid>

{/* Zone 3: Découvrir les riders */}
 <Grid item xs={12}>
          <Box p={4} bgcolor="#8F9779" color="#ffffff"  >
            <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center' }} gutterBottom>Discover the riders</Typography>
            <Carousel sx={{display:'flex ', justifyContent:'center'}} riders={allRiders} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
