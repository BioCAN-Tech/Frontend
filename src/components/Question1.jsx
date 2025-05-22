import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Button,
  IconButton,
  Tooltip,
  GlobalStyles,
  Snackbar,
  Alert,
  Popover,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Question1() {
  const location = useLocation();
  const userName = location.state?.userName || "User";
  const navigate = useNavigate();
  const [definedAs, setDefinedAs] = useState("");
  const [identifiedAs, setIdentifiedAs] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isTypingDefinedAs, setIsTypingDefinedAs] = useState(false);
  const [isTypingIdentifiedAs, setIsTypingIdentifiedAs] = useState(false);
  const [typingBubbleText, setTypingBubbleText] = useState("");
  const [showQuestion3, setShowQuestion3] = useState(false);
  const [isTypingQuestion3, setIsTypingQuestion3] = useState(false);
  const [question2Text, setQuestion2Text] = useState("");
  const [question3Text, setQuestion3Text] = useState("");

  const handleInfoClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const commonButtonStyles = {
    textTransform: "none",
    borderColor: "#555",
    flex: 1,
  };

  const handleDefineSelf = (value) => {
    setDefinedAs(""); // Clear previous selection
    setIsTypingDefinedAs(true);
    setTypingBubbleText(""); // Initial typing text
    setShowQuestion3(false); // Ensure Q3 is hidden if Q2 is answered again
    setIdentifiedAs(""); // Clear Q3 answer if Q2 is answered again
    setShowThankYou(false);

    // Simulate typing delay for Q2 answer
    setTimeout(() => {
      setIsTypingDefinedAs(false);
      setDefinedAs(value);

      // Simulate typing animation before showing Q3
      setIsTypingQuestion3(true);
      setTimeout(() => {
        setIsTypingQuestion3(false);
        setShowQuestion3(true);
      }, 1000); // 1-second typing animation for Q3
    }, 1500); // Adjust delay as needed for Q2
  };

  const handleIdentifySelf = (value) => {
    setIdentifiedAs(""); // Clear previous selection
    setIsTypingIdentifiedAs(true);

    setTimeout(() => {
      setIsTypingIdentifiedAs(false);
      setIdentifiedAs(value);
      setShowThankYou(true);
    }, 1500); // Adjust delay as needed
  };

  useEffect(() => {
    const text = "2. What defines you?";
    let index = 0;
    setQuestion2Text("");
    const interval = setInterval(() => {
      setQuestion2Text((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 40); // typing speed in ms
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!definedAs) return;
    const text = "3. How do you identify yourself?";
    let index = 0;
    setQuestion3Text("");
    const interval = setInterval(() => {
      setQuestion3Text((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [definedAs]);

  return (
    <Box
      sx={{ minHeight: "95vh", backgroundColor: "#000", color: "#fff", p: 2 }}
    >
      <Box
        sx={{
          maxWidth: 450,
          mx: "auto",
          mb: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
          mt: 0,
          px: 1,
        }}
      >
        <img src="/images/BioCan.png" alt="BioCAN" style={{ height: 40 }} />
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#fff",
            textTransform: "none",
            pl: 1,
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Card Container */}
      <Card
        sx={{
          background: "#2d2d2e",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: 4,
          px: 3,
          py: 4,
          maxWidth: 400,
          margin: "0 auto",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 40px rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        {/* Robot Icon */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <img
            src="/images/Group875.png"
            alt="robot"
            style={{ width: 50, height: 40, marginRight: 12 }}
          />
          {/* Welcome Message will follow here */}
        </Box>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mt: 2, fontFamily: "TT Norms", fontSize: 14 }}
        >
          Hello, {userName}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 2, opacity: 0.7, fontFamily: "TT Norms", fontSize: 12 }}
        >
          Please help us with some of your basic details
        </Typography>

        {/* Question 2 */}
        <Typography variant="body2">2. What defines you?</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.9rem",
            fontWeight: "bold",
            mt: 1,
            gap: 1,
            fontFamily: "TT Norms",
            fontSize: 12,
          }}
        >
          {["Studying", "Recent graduate", "Working"].map((option) => (
            <Button
              key={option}
              variant={definedAs === option ? "contained" : "outlined"}
              onClick={() => handleDefineSelf(option)}
              sx={{
                ...commonButtonStyles,
                backgroundColor: definedAs === option ? "#161617" : "inherit",
                color: definedAs === option ? "#fff" : "inherit",
                fontFamily: "TT Norms",
                fontSize: 13,
              }}
            >
              {option}
            </Button>
          ))}
        </Box>

        {/* Typing Bubble for Q2 */}
        {isTypingDefinedAs && (
          <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#888",
                animation: "blink 1s infinite alternate",
                mr: 0.5,
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#888",
                animation: "blink 1s infinite alternate 0.2s",
                mr: 0.5,
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: "#888",
                animation: "blink 1s infinite alternate 0.4s",
              }}
            />
            {typingBubbleText && (
              <Typography variant="body2">
                {question2Text}
                {question2Text.length < "2. What defines you?".length && (
                  <span className="typing-cursor">|</span>
                )}
              </Typography>
            )}
          </Box>
        )}

        {/* Selected for Q2 */}
        {definedAs && !isTypingDefinedAs && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#161617",
                color: "#fff",
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontFamily: "TT Norms",
                fontSize: 13,
              }}
              disableElevation
            >
              {definedAs}
            </Button>
          </Box>
        )}

        {/* Question 3 */}
        {definedAs && !isTypingDefinedAs && (
          <>
            <Typography variant="body2" sx={{ mt: 3 }}>
              {question3Text}
            </Typography>

            {isTypingQuestion3 && (
              <Box sx={{ display: "flex", mt: 1, alignItems: "center" }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#888",
                    animation: "blink 1s infinite alternate",
                    mr: 0.5,
                  }}
                />
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#888",
                    animation: "blink 1s infinite alternate 0.2s",
                    mr: 0.5,
                  }}
                />
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: "#888",
                    animation: "blink 1s infinite alternate 0.4s",
                  }}
                />
              </Box>
            )}

            {showQuestion3 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                  gap: 1,
                  fontFamily: "TT Norms",
                  fontSize: 13,
                }}
              >
                {["Male", "Female", "Others"].map((option) => (
                  <Button
                    key={option}
                    variant={identifiedAs === option ? "contained" : "outlined"}
                    onClick={() => handleIdentifySelf(option)}
                    sx={{
                      ...commonButtonStyles,
                      backgroundColor:
                        identifiedAs === option ? "#000" : "inherit",
                      color: identifiedAs === option ? "#fff" : "inherit",
                      fontFamily: "TT Norms",
                      fontSize: 13,
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            )}

            {/* Selected for Q3 */}
            {identifiedAs && !isTypingIdentifiedAs && (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontFamily: "TT Norms",
                    fontSize: 13,
                  }}
                  disableElevation
                >
                  {identifiedAs}
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Thank you + Start Assessment */}
        {showThankYou && !isTypingIdentifiedAs && showQuestion3 && (
          <>
            <Typography
              variant="body2"
              sx={{ mt: 3, mb: 2, opacity: 0.7, fontSize: "0.85rem" }}
            >
              Thank you {userName}, let’s begin with the assessment and also
              click on the info icon if you want to learn more about it.
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Tooltip title="Learn more about the assessment">
                <IconButton
                  onClick={handleInfoClick}
                  sx={{
                    backgroundColor: "#444",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#666",
                    },
                  }}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(to right, #1e3a8a, #1e40af)",
                  color: "#fff",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  px: 12,
                  borderRadius: 2,
                  "&:hover": {
                    background: "#666",
                  },
                }}
                onClick={() => navigate("/assessmentonboardingcard")}
              >
                Start Assessment
              </Button>
            </Box>
          </>
        )}
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <GlobalStyles
        styles={{
          "@keyframes blink": {
            "0%": { opacity: 0.2 },
            "50%": { opacity: 1 },
            "100%": { opacity: 0.2 },
          },
          html: {
            height: "100%",
            overflow: "hidden",
          },
          body: {
            margin: 0,
            height: "100%",
            overflow: "hidden",
          },
          "#root": {
            height: "100%",
          },
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              borderRadius: 3,
              p: 2,
              mb: 5,
              maxWidth: 350,
              color: "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              transition: "all 0.3s ease",
            },
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 0,
            right: 2,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          sx={{ fontFamily: "TT Norms", fontSize: 13, color: "#fff" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          illum perspiciatis ullam distinctio minima explicabo quia quis
          laboriosam.
        </Typography>
      </Popover>
    </Box>
  );
}
