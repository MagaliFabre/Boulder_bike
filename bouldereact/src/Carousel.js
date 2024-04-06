import React, { useState } from 'react';
import './Carousel.css'; 
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Typography } from '@mui/material';

const Carousel = ({ riders }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === riders.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? riders.length - 1 : prevIndex - 1));
  };


  return (
    <Box className="carousel" sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <IconButton className="next" onClick={nextSlide}><ArrowForwardIcon /></IconButton>
      {riders.map((rider, index) => (
        <div
          className={index === currentIndex ? 'slide active' : 'slide'}
          key={index}
        >
          {index === currentIndex && (
            <>
              <img className="carousel-image" src={require(`./media/${rider.img}`)} width={'auto'} height={500} alt={rider.title} />
              <Typography variant="h6">{rider.firstName} {rider.lastName}</Typography>
            </>
          )}
        </div>
      ))}
      <IconButton className="prev" onClick={prevSlide}><ArrowBackIcon /></IconButton>
      
    </Box>
  );
  
};

export default Carousel;
