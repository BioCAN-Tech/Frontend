import { useEffect, useState, useRef } from "react";
import { GlobalStyles } from "@mui/material";
import {
  Box,
  Typography,
  Card,
  IconButton,
  InputBase,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";

export default function QuestionnaireScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const userNameFromLocation = location.state?.userName || "User";

  const message1FullText =
    "I’m BioCAN, your guide to unlocking your unique potential in life sciences and beyond.";
  const message2FullText = `I see your name as ${userNameFromLocation} – is this the correct name for your certificate? If not, please type your full name.`;

  const [name, setName] = useState("");
  const [displayedMessage1, setDisplayedMessage1] = useState("");
  const [displayedMessage2, setDisplayedMessage2] = useState("");
  const [typingMessageIndex, setTypingMessageIndex] = useState(0);
  const [inputVisible, setInputVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [showThankYou, setShowThankYou] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [limitExceededMessage, setLimitExceededMessage] = useState("");
  const [validationErrorMessage, setValidationErrorMessage] = useState(""); // New state for inline error

  const cardRef = useRef(null);

  useEffect(() => {
    let typingInterval;

    const typeMessage = (fullText, setDisplayedText, nextMessageIndex) => {
      let currentDisplayedText = "";
      let charIndex = 0;

      if (typingInterval) clearInterval(typingInterval); // Clear any previous interval

      typingInterval = setInterval(() => {
        currentDisplayedText += fullText[charIndex];
        setDisplayedText(currentDisplayedText);
        charIndex++;

        if (charIndex === fullText.length) {
          clearInterval(typingInterval);
          if (typingMessageIndex !== nextMessageIndex) {
            setTypingMessageIndex(nextMessageIndex);
          }
        }
      }, 20);
    };

    if (typingMessageIndex === 0) {
      typeMessage(message1FullText, setDisplayedMessage1, 1);
    } else if (typingMessageIndex === 1) {
      const delayBeforeMessage2 = setTimeout(() => {
        typeMessage(message2FullText, setDisplayedMessage2, 2);
      }, 500);

      return () => {
        clearInterval(typingInterval);
        clearTimeout(delayBeforeMessage2);
      };
    } else if (typingMessageIndex === 2) {
      setInputVisible(true);
    }

    return () => {
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [typingMessageIndex, userNameFromLocation]);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollTop = cardRef.current.scrollHeight;
    }
  }, [displayedMessage1, displayedMessage2, inputVisible, showThankYou, limitExceededMessage, validationErrorMessage]);

  const handleSend = async () => {
    const trimmedName = name.trim();
    setValidationErrorMessage(""); // Clear any previous inline error

    // Frontend validation: length and character type
    if (trimmedName.length < 2) {
      setValidationErrorMessage("Name must be at least 2 characters.");
      return;
    }

    const namePattern = /^[a-zA-Z\s-]+$/;
    if (!namePattern.test(trimmedName)) {
      setValidationErrorMessage("Only alphabetic characters, spaces, and hyphens allowed in names.");
      return;
    }

    // If the user confirms the existing name from location state
    if (trimmedName.toLowerCase() === userNameFromLocation.toLowerCase()) {
      setShowThankYou(true);
      setSnackbar({
        open: true,
        message: `Thank you, ${trimmedName}. Proceeding...`,
        severity: "success",
      });
      setTimeout(() => {
        navigate("/question1", { state: { userName: trimmedName } });
      }, 3000);
      return;
    }

    console.log("Sending name for validation:", trimmedName, "Attempt:", attemptCount + 1);
    try {
      const response = await fetch("https://biocan-backend.onrender.com/validate_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "what is your name?",
          answer: trimmedName,
          response: (attemptCount + 1).toString(),
        }),
      });

      const data = await response.json();
      console.log("Validation raw response:", response);
      console.log("Validation parsed data:", data);

      if (response.ok) {
        if (data?.result?.toLowerCase() === "valid") {
          setShowThankYou(true);
          setSnackbar({
            open: true,
            message: `Thank you, ${trimmedName}. Proceeding...`,
            severity: "success",
          });
          setTimeout(() => {
            navigate("/question1", { state: { userName: trimmedName } });
          }, 3000);
        } else if (data?.result) {
          setValidationErrorMessage(data.result);
          setAttemptCount((prevCount) => prevCount + 1);
          if (attemptCount + 1 >= 3 && data.result.includes("Response limit exceeded")) {
            setLimitExceededMessage(data.result);
            setInputVisible(false); // Disable input after limit exceeded
          }
        } else {
          setValidationErrorMessage(data.message || "Name not valid for certificate. Please try again.");
          setAttemptCount((prevCount) => prevCount + 1);
          if (attemptCount + 1 >= 3 && (data.message || "").includes("Response limit exceeded")) {
            setLimitExceededMessage(data.message);
            setInputVisible(false); // Disable input after limit exceeded
          }
        }
      } else {
        setSnackbar({
          open: true,
          message: data.message || "Failed to validate name.",
          severity: "error",
        });
        setAttemptCount((prevCount) => prevCount + 1);
        if (attemptCount + 1 >= 3 && (data.message || "").includes("Response limit exceeded")) {
          setLimitExceededMessage(data.message);
          setInputVisible(false); // Disable input after limit exceeded
        }
      }
    } catch (error) {
      console.error("Validation API error:", error);
      setSnackbar({
        open: true,
        message: "Error connecting to the server. Please check your internet connection.",
        severity: "error",
      });
      setAttemptCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 440,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <img
          src="/images/BioCan.png"
          alt="BioCAN"
          style={{ height: 40, alignSelf: 'flex-start', marginLeft: '3rem' }}
        />
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#fff",
            textTransform: "none",
            pl: 1,
            alignSelf: 'flex-start',
            marginLeft: '3rem',
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Card
        ref={cardRef}
        sx={{
          backgroundColor: "#1f1f1f",
          borderRadius: 4,
          px: 3,
          py: 4,
          maxWidth: 340,
          width: '90%',
          margin: "0 auto",
          color: "#fff",
          flexGrow: 0,
          display: "flex",
          flexDirection: "column",
          maxHeight: "70vh",
          overflowY: "auto",
          position: "relative",
          boxSizing: 'border-box'
        }}
      >
        <Box sx={{ mb: 1, alignSelf: "flex-start" }}>
          <img
            src="/images/Group875.png"
            alt="robot"
            style={{ width: 50, height: 30 }}
          />
        </Box>

        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontSize: 14 }}>
          Hello, {userNameFromLocation.toUpperCase()}!
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
          Please help us with some of your basic details
        </Typography>

        {displayedMessage1 && (
          <Typography
            variant="body2"
            sx={{ fontSize: 14, fontFamily: "ABeeZee", mb: 1 }}
          >
            {displayedMessage1}
          </Typography>
        )}

        {displayedMessage2 && (
          <Typography
            variant="body2"
            sx={{
              fontSize: 14,
              fontFamily: "ABeeZee",
              whiteSpace: "pre-line",
              mb: 1,
            }}
          >
            {displayedMessage2}
          </Typography>
        )}

        {limitExceededMessage && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {limitExceededMessage}
          </Alert>
        )}

        {validationErrorMessage && (
          <Typography color="error" sx={{ mt: 1, fontSize: 12 }}>
            {validationErrorMessage}
          </Typography>
        )}

        {inputVisible && !showThankYou && !limitExceededMessage && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#333",
              borderRadius: 3,
              px: 2,
              width: "100%",
              boxSizing: "border-box",
              mt: 2,
            }}
          >
            <InputBase
              placeholder="Type here...."
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ flex: 1, color: "#fff" }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && name.trim()) {
                  handleSend();
                }
              }}
            />
            <IconButton onClick={handleSend} disabled={!name.trim()}>
              <SendIcon sx={{ color: name.trim() ? "#4fc3f7" : "#777"}} />
            </IconButton>
          </Box>
        )}

        {showThankYou && (
          <Box
            sx={{
              mt: 3,
              backgroundColor: "#1f1f1f",
              borderRadius: 3,
              px: 3,
              py: 2,
              width: "100%",
              boxSizing: 'border-box',
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "#fff",
              fontFamily: "ABeeZee",
              fontSize: 14,
            }}
          >
            <Typography sx={{ marginLeft:"-1.5rem", fontFamily: "ABeeZee", fontSize: 14, mb: 1 }}>
              Thank you {name.trim()}, Please help us with some of your basic details.
            </Typography>
            <Box sx={{ display: "flex", mt: 1, justifyContent: 'left', width: '100%' }}>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#888",
                  animation: "blink 1s infinite alternate",
                  mx: 0.5,
                }}
              />
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#888",
                  animation: "blink 1s infinite alternate 0.2s",
                  mx: 0.5,
                }}
              />
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#888",
                  animation: "blink 1s infinite alternate 0.4s",
                  mx: 0.5,
                }}
              />
            </Box>
          </Box>
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
    </Box>
  );
}