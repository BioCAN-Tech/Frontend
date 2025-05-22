import React from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AssessmentCard({ userName }) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/questionnaire", { state: { userName } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        position: "relative",
        padding: "0.5rem",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <img
        src="/images/BioCan.png"
        alt="BioCan Logo"
        style={{
          width: "101.66px",
          maxWidth: 150,
          height: "36px",
          marginBottom: 20,
          zIndex: 2,
          marginRight: "14rem",
        }}
      />

      {/* Background Robot Image */}
      <img
        src="/images/Group875.png"
        alt="robot"
        style={{
          width: "111.94px",
          height: "61px",
          maxWidth: 350,
          position: "relative",
          marginRight: "15rem",
          zIndex: 1,
          marginTop:"0rem",
          marginBottom: "-77px",
        }}
      />

      {/* Glassy Card */}
      <Card
        sx={{
          mt: { xs: 3, sm: 9.5 },
          px: { xs: 2, sm: 2 },
          pt: 3,
          pb: 2,
          borderRadius: 4,
          maxWidth: 300,
          textAlign: "center",
          background:"linear-gradient(180deg, rgba(15, 39, 86, 0.78) 0%, rgba(24, 62, 136, 0.78) 50.96%, rgba(15, 39, 86, 0.78) 100%)",
          backdropFilter: "blur(20px)",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          zIndex: 1,
        }}
      >
        {userName && (
          <Typography
            fontWeight="bold"
            sx={{ mb: 2, width:"286px", height:"17px", fontSize: 14, fontFamily: "NimbusSanDExt", lineHeight: 1.2 }}
          >
            WELCOME, {userName.toUpperCase()}!
          </Typography>
        )}

        <Box mt={userName ? 0 : 3} mb={2}>
          <img
            src="/images/roller.png"
            alt="gift"
            style={{
              width: "25vw",
              maxWidth: 100,
              height: "auto",
            }}
          />
        </Box>

        <Typography
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: 15, fontFamily: "NimbusSanDExt", lineHeight: 1.2, display: "inline-block" }}
        >
          LET’S GO FROM
          <br />
          ‘WHAT’S NEXT?’ TO ‘WHAT’S BEST.’
        </Typography>

        <Typography variant="body2" sx={{ mt: 2, font:"TT Hoves", fontSize:"14px", lineHeight: 1.2 }}>
          🎯 93% of Indian students know only 7 careers, but 250+ options exist!
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, font:"TT Hoves", fontSize:"14px", lineHeight: 1.2  }}>
          ✨ Figure out who you are and what you can actually be in your career!
        </Typography>

        <Button
          onClick={handleNext}
          variant="text"
          sx={{
            mt: 4,
            color: "white",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: 14,
            borderBottom: "2px solid white",
            borderRadius: 0,
            marginBottom: 2,
            border: "none",
            backgroundColor: "transparent",
            padding: "0.5rem 1rem",
          }}
        >
          Let’s Go →
        </Button>
        {/* Border after the button */}
        <Box
          sx={{
            width: "80px", // set your desired width
            height: "2px", // set your desired thickness
            backgroundColor: "#fff",
            margin: "auto",
            borderRadius: "2px",
            mt: -3,
          }}
        />
      </Card>
    </motion.div>
  );
}
