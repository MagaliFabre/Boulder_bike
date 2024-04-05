import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2'; 
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function PhotosPage() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchPhotos(page);
    }, [page]);

    const fetchPhotos = (pageNumber) => {
        axios.get('https://api.flickr.com/services/rest', {
            params: {
                method: 'flickr.photos.search',
                api_key: '47d39385175a38cc0ca67d59a36640a3',
                tags: 'BoulderBikeTour, BoulderBike, BoulderBikeRace, BoulderRace, Bikerace,',
                per_page: 40,
                page: pageNumber,
                format: 'json',
                nojsoncallback: 1
            }
        })
        .then(response => {
            setPhotos(response.data.photos.photo);
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
        });
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2, marginTop: 2, backgroundColor: 'white', borderRadius: 5 }}>
            <Grid container spacing={2}>
                <Grid textAlign="center" xs={12}><h1>Photos from the Boulder Bike Tour</h1></Grid>
            </Grid>
            <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                <IconButton onClick={handlePrevPage} disabled={page === 1}>
                    <ArrowBackIcon />
                </IconButton>
                <ImageList sx={{ width:1200, height: 800 }} cols={3} rowHeight={328}>
                    {photos.map(photo => (
                        <ImageListItem key={photo.id}>
                            <img
                                src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                                alt={photo.title}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <IconButton onClick={handleNextPage}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
            <Box textAlign="center">
                Page {page}
            </Box>
        </Box>
    );
}

export default PhotosPage;
