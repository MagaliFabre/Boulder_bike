import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function ContestPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    slogan: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/v1/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Submission successful!');
        setSuccess(true);
        setError(false);
        // Clear form data
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          slogan: ''
        });
      } else {
        console.error('Submission failed:', response.statusText);
        setError(true);
        setSuccess(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, margin: 'auto', padding: 2, marginTop: 10, backgroundColor: 'white', borderRadius: 5, height:500 }}>
      <Typography variant="h4" color="gray" gutterBottom>
        Submit Your Slogan
      </Typography>
      {success && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="success">Form submitted successfully!</Alert>
        </Stack>
      )}
      {error && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Failed to submit form. Please try again.</Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          fullWidth
          label="Slogan (under 50 characters)"
          name="slogan"
          value={formData.slogan}
          onChange={handleChange}
          inputProps={{ maxLength: 50 }}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" sx={{ width: '200px', marginTop: 2, backgroundColor: '#8F9779', color: '#ffffff' }}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default ContestPage;
