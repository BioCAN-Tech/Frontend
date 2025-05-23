import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, LinearProgress, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

// Styled component for the glassy background
const GlassyContainer = styled(motion.div)(({ theme }) => ({
  background: "linear-gradient(180deg, rgba(15, 39, 86, 0.78) 0%, rgba(24, 62, 136, 0.78) 50.96%, rgba(15, 39, 86, 0.78) 100%)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)", // For Safari
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  width: "400px", // Adjust as needed
}));

const ProgressBarContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const App = () => {
  const [timer, setTimer] = useState(() => {
    const storedTimer = sessionStorage.getItem("quizForwardTimer");
    return storedTimer ? parseInt(storedTimer, 10) : 0; // Start from 0 seconds
  });
  const [progress, setProgress] = useState(0); // Represents the number of questions answered
  const totalQuestions = 20;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("quizForwardTimer", timer.toString());
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleNextQuestion = () => {
    if (progress < totalQuestions) {
      setProgress((prevProgress) => prevProgress + 1);
      // Reset any per-question state here if needed
    } else {
      // Quiz completed logic
      console.log("Quiz completed!");
    }
  };

  const handleBack = () => {
    // Implement back navigation logic
    console.log("Back");
  };

  const progressPercentage = (progress / totalQuestions) * 100;
  const progressBarColor = progress === totalQuestions ? "success" : "primary";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f2f5" // A light background
    >
      <GlassyContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1">
            Next Q coming in hot 🔥 Stay locked in
          </Typography>
          <Typography variant="h6">{formatTime(timer)}</Typography>
        </Box>

        <ProgressBarContainer>
          <Typography variant="body2">Section - A</Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{ flexGrow: 1, height: 8, borderRadius: 1 }}
            color={progressBarColor}
          />
          <Typography variant="body2">
            ({progress}/{totalQuestions})
          </Typography>
        </ProgressBarContainer>

        {/* Placeholder for the question content */}
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 1,
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">
            Find the missing piece - Which one fits in the '?' spot?
          </Typography>
          {/* Here you would render the images/question elements */}
          <Box mt={2}>
            {/* Placeholder for the domino images */}
            {/* You'll need to map through your data to display these */}
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 1 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 2 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 3 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 4 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 5 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 6 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 7 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>
                {/* Domino 8 */}
              </Box>
              <Box sx={{ border: "1px solid #ccc", p: 1 }}>?</Box>
            </Box>
          </Box>
        </Box>

        {/* Placeholder for the answer options */}
        <Box mt={2} display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
          <Box sx={{ border: "1px solid #ccc", p: 2, textAlign: "center" }}>
            {/* Option 1 */}
          </Box>
          <Box sx={{ border: "1px solid #ccc", p: 2, textAlign: "center" }}>
            {/* Option 2 */}
          </Box>
          <Box sx={{ border: "1px solid #ccc", p: 2, textAlign: "center" }}>
            {/* Option 3 */}
          </Box>
          <Box sx={{ border: "1px solid #ccc", p: 2, textAlign: "center" }}>
            {/* Option 4 */}
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleBack}>← BACK</Button>
          <Button onClick={handleNextQuestion}>NEXT →</Button>
        </Box>
      </GlassyContainer>
    </Box>
  );
};

export default App;
