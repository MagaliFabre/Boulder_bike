import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function RiderCards() {
  const [riders, setRiders] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer les données des riders depuis l'API
    const fetchRidersData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/riders');
        if (!response.ok) {
          throw new Error('Failed to fetch riders data');
        }
        const data = await response.json();
        setRiders(data);
      } catch (error) {
        console.error("Error fetching riders data:", error);
      }
    };

    // Charger les données des riders lorsque le composant est monté
    fetchRidersData();
  }, []);

  return (
    <Box mt={4} mx="auto" maxWidth={1200} px={2}>
      <Grid container spacing={2}>
        {riders.map((rider, index) => (
          <Grid item xs={3} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  src={require(`../media/rider${index + 1}.jpg`)}
                  alt={`Rider ${rider.id}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${rider.first_name} ${rider.last_name}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${rider.city}, ${rider.state}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
