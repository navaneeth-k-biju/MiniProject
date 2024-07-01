import React from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '../assets/img/135188-qkbxsgovsx-1584709357.jpg'
import { useState,useEffect } from 'react';
const FontLink = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

function LauncherPage() {
  const [animate, setAnimate] = useState(false);
    const navigate=useNavigate()
    useEffect(() => {
      // Trigger animation after a short delay to allow rendering
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 100);
  
      return () => clearTimeout(timer);
    }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: `url(${image})` ,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
      <FontLink/>
      <Paper sx={{
        background:"#ff3",
         width:"40%" ,
         borderRadius:"20px",
         padding:2,
         transition: 'transform 0.5s ease',
          transform: animate ? 'scale(1)' : 'scale(0)',
         }}>
      <Typography variant="h3" component="h1" sx={{ color:"#000", mb: 5 }}>
        Smart Ration
      </Typography>
      <Typography variant="body1" sx={{ color:"#000", mb: 10 }}>
        We provide all data about your Ration
      </Typography>
      <Stack spacing={2} sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Button
        sx={{
          maxWidth:"50%"
        }}
        onClick={(eve)=>{
            navigate('login')
        }}
         variant="contained" color="secondary" size="large">
          Get Started
        </Button>
        <Button
        sx={{color:"#000"}}
        variant="outlined" color="secondary" size="large">
          Learn More
        </Button>
      </Stack>
      </Paper>
      
    </Box>
  );
}

export default LauncherPage;
