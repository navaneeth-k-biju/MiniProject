import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';

const AboutPage = () => {
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 600 }}>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random/500x400?about" // Replace with your image
                alt="About Us"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body1">
                  {/* Describe your company, mission, and values here */}
                  
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Team
            </Typography>
            {/* Add team member details here (optional) */}
            <Typography variant="body1">
              {/* Briefly introduce your team members */}
              We have a passionate team of individuals dedicated to ... (your focus area). Learn more about them on our dedicated team page (link if applicable).
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AboutPage;
