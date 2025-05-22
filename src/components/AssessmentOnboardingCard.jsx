import React from 'react';
import { Card, CardContent, Typography, Box, Button, useTheme } from '@mui/material';

const AssessmentOnboardingCard = () => {
  const theme = useTheme(); // Access the theme object

  return (
    <Box
      sx={{
        margin:"3rem auto", 
        justifyContent:"center", 
        background: 'linear-gradient(180deg, #1a237e 0%, #0d47a1 100%)', 
        border: 'transparent', 
        borderRadius:"10px",
        padding: 2, 
        maxWidth: 400, 
        color: '#ffffff', 
        textAlign: 'center', 
      }}
    >
      <CardContent sx={{ padding: 0, '&:last-child': { marginTop: 5 } }}>
       
        <Box sx={{ mb: 3 }}>
         <img src="/images/gift-box.png" alt="Gift" />
        </Box>

        <Typography gutterBottom sx={{ width:"234px",margin:"auto", fontWeight: 'bold', fontSize:"14px", lineHeight:"100%", font:"Nimbus Sans D OT" }}>
          WHY COMPLETE THE ASSESMENT
        </Typography>

        <Box sx={{ textAlign: 'left', mb: 3, mt:5  }}>
          <Typography variant="body1" sx={{ mb: 1, mt:5, font:"TT Hoves", fontSize:"14px", textAlign:"center" }}>
            🎯 500+ career matches based on your vibe.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, font:"TT Hoves", fontSize:"14px", textAlign:"center" }}>
            💼 Real job tea – roles, pay, growth, all in.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1,  font:"TT Hoves", fontSize:"14px", textAlign:"center" }}>
            🎒 Step-by-step roadmap from lost to boss.
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 3, font:"TT Hoves", fontSize:"14px", width:"200px", margin:"auto", }}>
          ✨ 20 minutes today will change your next 20 years.
        </Typography>

        {/* Placeholder for the group of people image */}
        <Box sx={{ mb: 3 }}>
        <hr />
          <img src="/images/Groupimg.png" alt="" />  
          <hr />        
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            backgroundColor: '#ffb300', // Amber color for the button
            color: '#000000', // Black text color
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ffa000', // Darker amber on hover
            },
          }}
        >
          LETS START →
        </Button>
      </CardContent>
    </Box>
  );
};

export default AssessmentOnboardingCard;
